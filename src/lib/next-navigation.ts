/**
 * Client-side router adapter supporting Next.js router conventions in SPA mode
 */

export interface AppRouterInstance {
  push(href: string, options?: unknown): void;
  replace(href: string, options?: unknown): void;
  back(): void;
  forward(): void;
  refresh(): void;
  prefetch(href: string): void;
}

export function useRouter(): AppRouterInstance {
  return {
    push(href: string) {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    },
    replace(href: string) {
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    },
    back() {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    },
    forward() {
      if (typeof window !== 'undefined') {
        window.history.forward();
      }
    },
    refresh() {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    },
    prefetch() {},
  };
}

export function usePathname(): string {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
}

export function useSearchParams(): URLSearchParams {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}

