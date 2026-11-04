export async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  const result = (await response.json()) as { error?: string } & T;
  if (!response.ok) {
    throw new Error(result.error || `Request failed with status ${response.status}`);
  }

  return result;
}
