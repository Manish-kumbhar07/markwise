declare module 'next/server' {
  export interface RequestCookie {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    sameSite?: true | false | 'lax' | 'strict' | 'none';
    secure?: boolean;
    httpOnly?: boolean;
  }

  export class NextRequest extends Request {
    nextUrl: URL;
    cookies: {
      get(name: string): RequestCookie | undefined;
      getAll(): RequestCookie[];
      set(name: string, value: string, options?: unknown): void;
      delete(name: string): void;
      has(name: string): boolean;
    };
  }

  export class NextResponse extends Response {
    static next(init?: { request?: { headers?: Headers } }): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    static json(body: unknown, init?: ResponseInit): NextResponse;
    cookies: {
      get(name: string): RequestCookie | undefined;
      getAll(): RequestCookie[];
      set(name: string, value: string, options?: unknown): void;
      delete(name: string): void;
    };
  }
}

declare module 'next/navigation' {
  export interface AppRouterInstance {
    push(href: string, options?: unknown): void;
    replace(href: string, options?: unknown): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(href: string): void;
  }

  export function useRouter(): AppRouterInstance;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/headers' {
  export interface CookieOption {
    name: string;
    value: string;
    [key: string]: unknown;
  }

  export interface ReadonlyRequestCookies {
    get(name: string): { name: string; value: string } | undefined;
    getAll(): Array<{ name: string; value: string }>;
    has(name: string): boolean;
    set(name: string, value: string, options?: unknown): void;
    set(options: CookieOption): void;
    delete(name: string): void;
  }

  export function cookies(): Promise<ReadonlyRequestCookies>;
  export function headers(): Promise<Headers>;
}
