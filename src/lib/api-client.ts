import { createClient } from '../utils/supabase/client';

export async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  let authHeaders: Record<string, string> = {};

  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      const activeWs = window.localStorage.getItem('markwise_active_workspace_id');
      if (activeWs) {
        authHeaders['x-workspace-id'] = activeWs;
      }
    }
  } catch {
    // If running in an environment without browser storage, proceed without token
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...authHeaders,
      ...init?.headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const rawText = await response.text();
    throw new Error(
      `API endpoint '${url}' returned non-JSON response (${response.status}): ${rawText.slice(0, 120)}`
    );
  }

  const result = (await response.json()) as { error?: string } & T;
  if (!response.ok) {
    throw new Error(result.error || `Request failed with status ${response.status}`);
  }

  return result;
}
