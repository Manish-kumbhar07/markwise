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

  const result = (await response.json()) as { error?: string } & T;
  if (!response.ok) {
    throw new Error(result.error || `Request failed with status ${response.status}`);
  }

  return result;
}
