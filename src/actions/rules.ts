'use server';

import { prisma } from '../lib/prisma';
import { supabase } from '../lib/supabase';
import type { Rule } from '@prisma/client';

export const DEFAULT_WORKSPACE_ID = 'ws_markwise_default';

export async function getRules(workspaceId: string = DEFAULT_WORKSPACE_ID): Promise<Rule[]> {
  try {
    return await prisma.rule.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    if (supabase) {
      const { data, error } = await supabase
        .from('Rule')
        .select('*')
        .eq('workspaceId', workspaceId)
        .order('createdAt', { ascending: false });
      if (!error && data) return data as Rule[];
    }
    throw err;
  }
}

export async function createRule(
  formData: FormData | { title: string; type: string; severity: string; definition: string; workspaceId?: string }
): Promise<Rule> {
  let title = '';
  let type = 'CLAIM';
  let severity = 'HIGH';
  let definition = '';
  let workspaceId = DEFAULT_WORKSPACE_ID;

  if (formData instanceof FormData) {
    title = String(formData.get('title') || '').trim();
    type = String(formData.get('type') || 'CLAIM');
    severity = String(formData.get('severity') || 'HIGH');
    definition = String(formData.get('definition') || '').trim();
    workspaceId = String(formData.get('workspaceId') || DEFAULT_WORKSPACE_ID);
  } else {
    title = (formData.title || '').trim();
    type = formData.type || 'CLAIM';
    severity = formData.severity || 'HIGH';
    definition = (formData.definition || '').trim();
    workspaceId = formData.workspaceId || DEFAULT_WORKSPACE_ID;
  }

  if (!title) {
    throw new Error('Rule title is required');
  }
  if (!definition) {
    throw new Error('Rule definition is required');
  }

  try {
    return await prisma.rule.create({
      data: {
        title,
        type,
        severity,
        definition,
        workspaceId,
        version: 1,
      },
    });
  } catch (err) {
    if (supabase) {
      const { data, error } = await supabase
        .from('Rule')
        .insert([
          {
            title,
            type,
            severity,
            definition,
            workspaceId,
            version: 1,
          },
        ])
        .select()
        .single();
      if (!error && data) return data as Rule;
    }
    throw err;
  }
}

export async function createRuleAction(formData: FormData): Promise<void> {
  await createRule(formData);
}

export async function deleteRule(id: string): Promise<Rule | null> {
  try {
    return await prisma.rule.delete({
      where: { id },
    });
  } catch (err) {
    if (supabase) {
      const { data, error } = await supabase.from('Rule').delete().eq('id', id).select().single();
      if (!error && data) return data as Rule;
    }
    throw err;
  }
}
