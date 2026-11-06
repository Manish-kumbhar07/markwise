'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUserWorkspace } from '@/lib/workspace';

export interface CreateFactInput {
  claim: string;
  evidenceSource: string;
  expiryDate: string | Date;
  status?: string;
}

/**
 * Fetch all facts strictly isolated to the user's workspace.
 */
export async function getFacts() {
  const { workspaceId } = await requireUserWorkspace();

  return prisma.fact.findMany({
    where: { workspaceId },
    orderBy: { id: 'desc' },
  });
}

/**
 * Create a new fact anchor strictly scoped to the authenticated user's workspace.
 */
export async function createFact(input: CreateFactInput) {
  const { workspaceId } = await requireUserWorkspace();

  if (!input.claim?.trim()) {
    throw new Error('Claim description is required.');
  }
  if (!input.evidenceSource?.trim()) {
    throw new Error('Evidence source anchor is required.');
  }

  const expiry = typeof input.expiryDate === 'string'
    ? new Date(input.expiryDate)
    : input.expiryDate;

  const newFact = await prisma.fact.create({
    data: {
      workspaceId,
      claim: input.claim.trim(),
      evidenceSource: input.evidenceSource.trim(),
      expiryDate: isNaN(expiry.getTime()) ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : expiry,
      status: input.status?.toUpperCase() === 'EXPIRED' ? 'EXPIRED' : 'ACTIVE',
    },
  });

  revalidatePath('/dashboard/facts');
  revalidatePath('/dashboard/review');
  return newFact;
}

/**
 * Delete a fact anchor, verifying workspace ownership.
 */
export async function deleteFact(id: string) {
  const { workspaceId } = await requireUserWorkspace();

  const fact = await prisma.fact.findFirst({
    where: { id, workspaceId },
  });

  if (!fact) {
    throw new Error('Fact not found or unauthorized.');
  }

  await prisma.fact.delete({
    where: { id },
  });

  revalidatePath('/dashboard/facts');
  revalidatePath('/dashboard/review');
  return { success: true };
}

