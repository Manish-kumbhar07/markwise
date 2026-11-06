'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUserWorkspace } from '@/lib/workspace';

export interface WorkspaceItem {
  id: string;
  name: string;
  isCurrent: boolean;
  rulesCount: number;
  factsCount: number;
}

export interface WorkspaceStats {
  rulesCount: number;
  factsCount: number;
  pendingCount: number;
  approvalsCount: number;
}

/**
 * Get all workspaces accessible by the current authenticated user.
 * If user has no workspaces, automatically creates "My Workspace".
 */
export async function getWorkspaces(): Promise<WorkspaceItem[]> {
  const { userId, workspaceId } = await requireUserWorkspace();

  let workspaces = await prisma.workspace.findMany({
    where: {
      OR: [
        { users: { some: { id: userId } } },
        { id: workspaceId },
      ],
    },
    include: {
      _count: {
        select: {
          rules: true,
          facts: true,
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  if (workspaces.length === 0) {
    const defaultWs = await prisma.workspace.create({
      data: {
        name: 'My Workspace',
        users: {
          connect: { id: userId },
        },
      },
      include: {
        _count: {
          select: {
            rules: true,
            facts: true,
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { workspaceId: defaultWs.id },
    });

    workspaces = [defaultWs];
  }

  return workspaces.map((ws) => ({
    id: ws.id,
    name: ws.name,
    isCurrent: ws.id === workspaceId,
    rulesCount: ws._count.rules,
    factsCount: ws._count.facts,
  }));
}

/**
 * Server Action to create a new Workspace and link it to the user.
 */
export async function createWorkspace(formData: FormData | { name: string }): Promise<WorkspaceItem> {
  const { userId } = await requireUserWorkspace();

  let name = '';
  if (formData instanceof FormData) {
    name = (formData.get('name') as string)?.trim() || '';
  } else if (formData && typeof formData.name === 'string') {
    name = formData.name.trim();
  }

  if (!name) {
    throw new Error('Workspace name is required.');
  }

  const newWorkspace = await prisma.workspace.create({
    data: {
      name,
      users: {
        connect: { id: userId },
      },
    },
    include: {
      _count: {
        select: {
          rules: true,
          facts: true,
        },
      },
    },
  });

  // Switch the user to the newly created workspace
  await prisma.user.update({
    where: { id: userId },
    data: { workspaceId: newWorkspace.id },
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/rules');
  revalidatePath('/dashboard/facts');
  revalidatePath('/dashboard/review');
  revalidatePath('/dashboard/approvals');
  revalidatePath('/dashboard/insights');

  return {
    id: newWorkspace.id,
    name: newWorkspace.name,
    isCurrent: true,
    rulesCount: 0,
    factsCount: 0,
  };
}

/**
 * Switch active workspace for the authenticated user.
 */
export async function switchWorkspace(targetWorkspaceId: string): Promise<{ success: boolean }> {
  const { userId } = await requireUserWorkspace();

  const workspace = await prisma.workspace.findUnique({
    where: { id: targetWorkspaceId },
  });

  if (!workspace) {
    throw new Error('Workspace not found.');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { workspaceId: targetWorkspaceId },
  });

  revalidatePath('/dashboard');
  return { success: true };
}

/**
 * Real aggregated counts for the current active workspace.
 */
export async function getWorkspaceStats(targetWorkspaceId?: string): Promise<WorkspaceStats> {
  const { workspaceId: activeWsId } = await requireUserWorkspace();
  const workspaceId = targetWorkspaceId || activeWsId;

  const [rulesCount, factsCount, pendingCount, approvalsCount] = await Promise.all([
    prisma.rule.count({
      where: { workspaceId },
    }),
    prisma.fact.count({
      where: { workspaceId },
    }),
    prisma.issue.count({
      where: {
        content: { workspaceId },
        status: 'OPEN',
      },
    }),
    prisma.content.count({
      where: {
        workspaceId,
        status: { in: ['SUBMITTED_FOR_REVIEW', 'PENDING_APPROVAL', 'NEEDS_CHANGES'] },
      },
    }),
  ]);

  return {
    rulesCount,
    factsCount,
    pendingCount,
    approvalsCount,
  };
}

