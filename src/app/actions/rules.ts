'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUserWorkspace } from '@/lib/workspace';

export interface CreateRuleInput {
  title: string;
  definition: string;
  severity: string;
  type: string;
}

export interface CreateRuleFromIssueInput {
  title?: string;
  definition?: string;
  severity?: string;
  type?: string;
}

/**
 * Get all rules strictly isolated for the currently authenticated user's workspace.
 */
export async function getRules() {
  const { workspaceId } = await requireUserWorkspace();

  return prisma.rule.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Create a new rule strictly scoped to the authenticated user's workspace.
 */
export async function createRule(input: CreateRuleInput) {
  const { workspaceId } = await requireUserWorkspace();

  if (!input.title?.trim()) {
    throw new Error('Rule title is required.');
  }
  if (!input.definition?.trim()) {
    throw new Error('Rule definition is required.');
  }

  const severity = input.severity?.toUpperCase() || 'MEDIUM';
  const cleanSeverity = severity === 'HIGH' ? 'HIGH' : severity === 'LOW' ? 'LOW' : 'MEDIUM';

  const newRule = await prisma.rule.create({
    data: {
      workspaceId,
      title: input.title.trim(),
      definition: input.definition.trim(),
      severity: cleanSeverity,
      type: input.type?.trim() || 'TERMINOLOGY',
      version: 1,
    },
  });

  revalidatePath('/dashboard/rules');
  revalidatePath('/dashboard/review');
  return newRule;
}

/**
 * Delete a rule strictly validating workspace ownership.
 */
export async function deleteRule(id: string) {
  const { workspaceId } = await requireUserWorkspace();

  const rule = await prisma.rule.findFirst({
    where: { id, workspaceId },
  });

  if (!rule) {
    throw new Error('Rule not found or unauthorized.');
  }

  await prisma.rule.delete({
    where: { id },
  });

  revalidatePath('/dashboard/rules');
  revalidatePath('/dashboard/review');
  return { success: true };
}

/**
 * Create a new rule from an issue, verifying workspace ownership.
 */
export async function createRuleFromIssue(
  issueId: string,
  customData?: CreateRuleFromIssueInput
) {
  const { workspaceId } = await requireUserWorkspace();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      content: true,
      rule: true,
    },
  });

  if (!issue) {
    throw new Error(`Issue with ID ${issueId} not found.`);
  }

  // Multi-tenant check: ensure issue belongs to the user's workspace
  if (issue.content && issue.content.workspaceId !== workspaceId) {
    throw new Error('Unauthorized: Issue belongs to a different workspace.');
  }

  const title =
    customData?.title?.trim() ||
    issue.rule?.title ||
    `Brand Rule: ${issue.explanation.slice(0, 40)}`;
  const definition =
    customData?.definition?.trim() ||
    issue.suggestedFix ||
    issue.explanation;
  const severity = (
    customData?.severity ||
    issue.severity ||
    'MEDIUM'
  ).toUpperCase();
  const type = customData?.type || issue.rule?.type || 'TERMINOLOGY';

  const newRule = await prisma.rule.create({
    data: {
      workspaceId,
      title,
      definition,
      severity: severity === 'HIGH' ? 'HIGH' : severity === 'LOW' ? 'LOW' : 'MEDIUM',
      type,
      version: 1,
    },
  });

  await prisma.issue.update({
    where: { id: issueId },
    data: {
      status: 'RULE_CREATED',
      ruleId: newRule.id,
    },
  });

  revalidatePath('/dashboard/review');
  revalidatePath('/dashboard/rules');

  return newRule;
}
