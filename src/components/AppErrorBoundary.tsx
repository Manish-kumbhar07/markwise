import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<
  { children: ReactNode },
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application rendering failed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-red-50 p-6">
          <section
            role="alert"
            className="w-full max-w-xl rounded-2xl border border-red-300 bg-white p-8 text-red-900 shadow-lg"
          >
            <h1 className="text-2xl font-bold">Markwise hit an error</h1>
            <p className="mt-3 text-sm text-red-800">
              The page could not be displayed. Reload the app to try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
            >
              Reload app
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
