import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. Unauthenticated user trying to access /dashboard or any sub-route -> redirect to /login
  if (!user && (pathname === '/dashboard' || pathname.startsWith('/dashboard/'))) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Authenticated user trying to access /login or / -> redirect to /dashboard/rules
  if (user && (pathname === '/login' || pathname === '/')) {
    url.pathname = '/dashboard/rules';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/dashboard/:path*'],
};
