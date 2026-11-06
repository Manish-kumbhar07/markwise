/**
 * Next.js Instrumentation and Observability Hook
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.info('[Markwise Observability] Node.js server instrumentation registered');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    console.info('[Markwise Observability] Edge runtime instrumentation registered');
  }
}

export interface RequestErrorContext {
  routerKind: 'Pages Router' | 'App Router' | string;
  routePath: string;
  routeType: 'render' | 'route' | 'action' | 'middleware' | string;
  renderSource?: 'react-server-components' | 'server-rendering' | string;
  revalidateReason?: 'on-demand' | 'stale-while-revalidate' | string;
}

export interface RequestErrorRequest {
  path: string;
  method: string;
  headers?: Record<string, string | string[] | undefined>;
}

export async function onRequestError(
  err: { digest?: string } & Error,
  request: RequestErrorRequest,
  context: RequestErrorContext
) {
  const structuredTelemetry = {
    timestamp: new Date().toISOString(),
    event: 'server_request_error',
    error: {
      message: err?.message || 'Unknown Server Error',
      name: err?.name || 'Error',
      stack: err?.stack,
      digest: err?.digest,
    },
    request: {
      path: request?.path,
      method: request?.method,
    },
    context: {
      route: context?.routePath,
      routeType: context?.routeType,
      routerKind: context?.routerKind,
      renderSource: context?.renderSource,
    },
  };

  // Log structured diagnostic data for observability engines
  console.error('[Markwise Instrumentation Request Error]:', JSON.stringify(structuredTelemetry, null, 2));
}

