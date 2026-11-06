'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUserWorkspace } from '@/lib/workspace';

export interface ApprovalContentItem {
  id: string;
  title: string;
  bodyText: string;
  originalText: string;
  status: string;
  creator: string;
  department: string;
  issuesCount: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

function deriveOriginalText(currentBody: string): string {
  return currentBody;
}

export async function getApprovalQueue(): Promise<ApprovalContentItem[]> {
  const { workspaceId, userEmail } = await requireUserWorkspace();

  let contents = await prisma.content.findMany({
    where: {
      workspaceId,
      status: 'IN_REVIEW',
    },
    include: {
      issues: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return contents.map((c, index) => {
    const hasHighIssue = c.issues.some((i) => i.severity === 'HIGH');
    const hasMediumIssue = c.issues.some((i) => i.severity === 'MEDIUM');

    return {
      id: c.id,
      title: c.title,
      bodyText: c.bodyText,
      originalText: deriveOriginalText(c.bodyText),
      status: c.status,
      creator: index === 0 ? userEmail.split('@')[0] : 'Compliance Reviewer',
      department: index === 0 ? 'Product Marketing' : 'Global Communications',
      issuesCount: c.issues.length,
      riskLevel: hasHighIssue ? 'HIGH' : hasMediumIssue ? 'MEDIUM' : 'LOW',
    };
  });
}

export async function updateContentStatus(
  contentId: string,
  status: 'APPROVED' | 'REJECTED' | 'IN_REVIEW'
): Promise<void> {
  const { workspaceId } = await requireUserWorkspace();

  const content = await prisma.content.findFirst({
    where: { id: contentId, workspaceId },
  });

  if (!content) {
    throw new Error('Content not found or unauthorized.');
  }

  await prisma.content.update({
    where: { id: contentId },
    data: { status },
  });

  revalidatePath('/dashboard/approvals');
  revalidatePath('/dashboard/review');
  revalidatePath('/dashboard/insights');
}
