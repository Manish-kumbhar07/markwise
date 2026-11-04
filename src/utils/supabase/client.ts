import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://txhwkaesmhntloiwiuzo.supabase.co'
  )
    .replace(/^["']|["']$/g, '')
    .trim();

  const supabaseAnonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  )
    .replace(/^["']|["']$/g, '')
    .trim();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
