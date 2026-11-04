'use server';

import { prisma } from '../lib/prisma';
import { supabase } from '../lib/supabase';
import type { Fact } from '@prisma/client';

export const DEFAULT_WORKSPACE_ID = 'ws_markwise_default';

export async function getFacts(workspaceId: string = DEFAULT_WORKSPACE_ID): Promise<Fact[]> {
  try {
    return await prisma.fact.findMany({
      where: { workspaceId },
      orderBy: { expiryDate: 'asc' },
    });
  } catch (err) {
    if (supabase) {
      const { data, error } = await supabase
        .from('Fact')
        .select('*')
        .eq('workspaceId', workspaceId)
        .order('expiryDate', { ascending: true });
      if (!error && data) return data as Fact[];
    }
    throw err;
  }
}

export async function createFact(
  formData:
    | FormData
    | { claim: string; evidenceSource: string; expiryDate: string | Date; status?: string; workspaceId?: string }
): Promise<Fact> {
  let claim = '';
  let evidenceSource = '';
  let expiryDate = new Date();
  let status = 'Valid';
  let workspaceId = DEFAULT_WORKSPACE_ID;

  if (formData instanceof FormData) {
    claim = String(formData.get('claim') || '').trim();
    evidenceSource = String(formData.get('evidenceSource') || '').trim();
    const expiryStr = String(formData.get('expiryDate') || '');
    expiryDate = expiryStr ? new Date(expiryStr) : new Date();
    status = String(formData.get('status') || 'Valid');
    workspaceId = String(formData.get('workspaceId') || DEFAULT_WORKSPACE_ID);
  } else {
    claim = (formData.claim || '').trim();
    evidenceSource = (formData.evidenceSource || '').trim();
    expiryDate = formData.expiryDate instanceof Date ? formData.expiryDate : new Date(formData.expiryDate);
    status = formData.status || 'Valid';
    workspaceId = formData.workspaceId || DEFAULT_WORKSPACE_ID;
  }

  if (!claim) {
    throw new Error('Claim is required');
  }
  if (!evidenceSource) {
    throw new Error('Evidence source is required');
  }

  try {
    return await prisma.fact.create({
      data: {
        claim,
        evidenceSource,
        expiryDate,
        status,
        workspaceId,
      },
    });
  } catch (err) {
    if (supabase) {
      const { data, error } = await supabase
        .from('Fact')
        .insert([
          {
            claim,
            evidenceSource,
            expiryDate: expiryDate.toISOString(),
            status,
            workspaceId,
          },
        ])
        .select()
        .single();
      if (!error && data) return data as Fact;
    }
    throw err;
  }
}

export async function createFactAction(formData: FormData): Promise<void> {
  await createFact(formData);
}

export async function deleteFact(id: string): Promise<Fact | null> {
  try {
    return await prisma.fact.delete({
      where: { id },
    });
  } catch (err) {
    if (supabase) {
      const { data, error } = await supabase.from('Fact').delete().eq('id', id).select().single();
      if (!error && data) return data as Fact;
    }
    throw err;
  }
}
