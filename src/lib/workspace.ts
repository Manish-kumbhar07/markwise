import { prisma } from './prisma.ts';
import { createClient } from '../utils/supabase/server.ts';
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  DEMO_WORKSPACE_ID,
} from './workspace-constants.ts';

export { DEMO_USER_EMAIL, DEMO_USER_ID, DEMO_WORKSPACE_ID };

export interface UserWorkspaceContext {
  userId: string;
  userEmail: string;
  workspaceId: string;
}

// In-memory rate limiting map: identifier -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Enforce rate limiting per user (max 5 requests per minute)
 */
export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Filter out timestamps older than the sliding window
  const activeTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestInWindow = activeTimestamps[0];
    const retryAfter = Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfter) };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(identifier, activeTimestamps);
  return { allowed: true };
}

/**
 * Get or create an isolated Workspace for a specific authenticated user.
 */
export async function getOrCreateUserWorkspace(
  userId: string,
  email?: string
): Promise<UserWorkspaceContext> {
  const userEmail = email || `${userId}@enterprise.markwise.ai`;

  return prisma.$transaction(async (tx) => {
    // Check if user already exists with an assigned workspace
    let existingUser = await tx.user.findUnique({
      where: { id: userId },
      include: { workspace: true },
    });

    if (existingUser && existingUser.workspaceId) {
      return {
        userId: existingUser.id,
        userEmail: existingUser.email,
        workspaceId: existingUser.workspaceId,
      };
    }

    // Create a new isolated workspace on the fly for this user
    const workspaceName = 'My Workspace';

    const newWorkspace = await tx.workspace.create({
      data: {
        name: workspaceName,
      },
    });

    // Link user to the newly created workspace
    existingUser = await tx.user.upsert({
      where: { id: userId },
      update: {
        email: userEmail,
        workspaceId: newWorkspace.id,
      },
      create: {
        id: userId,
        email: userEmail,
        workspaceId: newWorkspace.id,
      },
      include: { workspace: true },
    });

    // Seed default baseline brand rules into the user's new workspace
    await tx.rule.createMany({
      data: [
        {
          workspaceId: newWorkspace.id,
          title: 'Unsupported Superlatives',
          severity: 'HIGH',
          type: 'COMPLIANCE',
          definition:
            'Prohibits unqualified guarantees of immunity, fastest performance, or absolute superlatives without auditable benchmark evidence.',
          version: 1,
        },
        {
          workspaceId: newWorkspace.id,
          title: 'Tone: Professional & Direct',
          severity: 'MEDIUM',
          type: 'VOICE_TONE',
          definition:
            'Avoid speculative marketing hyperbole and colloquialisms. Replace with measured, verified performance descriptions.',
          version: 1,
        },
        {
          workspaceId: newWorkspace.id,
          title: 'Data Privacy Compliance',
          severity: 'HIGH',
          type: 'COMPLIANCE',
          definition:
            'Prohibits claims regarding user data retention, security compliance, or encryption without citing certified enterprise attestations.',
          version: 1,
        },
      ],
    });

    // Seed initial Fact Vault evidence anchors for the user's workspace
    await tx.fact.createMany({
      data: [
        {
          workspaceId: newWorkspace.id,
          claim: 'SOC 2 Type II Certification with Zero Data Retention',
          evidenceSource: 'EV-004: Enterprise Security Attestation Report',
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: 'ACTIVE',
        },
        {
          workspaceId: newWorkspace.id,
          claim: '99.9% Uptime SLA guaranteed across all production environments',
          evidenceSource: 'EV-021: Independent Benchmark Evaluation & SLA Attestation 2025',
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: 'ACTIVE',
        },
      ],
    });

    return {
      userId: existingUser.id,
      userEmail: existingUser.email,
      workspaceId: newWorkspace.id,
    };
  });
}

/**
 * Fetch the current user using the Supabase server client.
 * Throws Unauthorized if no user is found.
 * Creates an isolated Workspace on the fly for that user if it doesn't exist.
 */
export async function requireUserWorkspace(): Promise<UserWorkspaceContext> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.id) {
    throw new Error('Unauthorized: You must be logged in to access this workspace.');
  }

  return getOrCreateUserWorkspace(user.id, user.email);
}

/**
 * Legacy demo workspace for public unauthenticated landing page simulations only.
 */
export async function getOrCreateDemoWorkspace() {
  return prisma.$transaction(async (transaction) => {
    const workspace = await transaction.workspace.upsert({
      where: { id: DEMO_WORKSPACE_ID },
      update: {},
      create: {
        id: DEMO_WORKSPACE_ID,
        name: 'Markwise Enterprise',
      },
    });

    await transaction.user.upsert({
      where: { email: DEMO_USER_EMAIL },
      update: { workspaceId: DEMO_WORKSPACE_ID },
      create: {
        id: DEMO_USER_ID,
        email: DEMO_USER_EMAIL,
        workspaceId: DEMO_WORKSPACE_ID,
      },
    });

    return workspace;
  });
}
