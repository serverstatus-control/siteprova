import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('UI error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-dark text-gray-100 p-6">
          <div className="max-w-lg w-full border border-border rounded-lg p-6 bg-dark-light">
            <h1 className="text-xl font-bold mb-2">Si è verificato un errore</h1>
            <p className="text-sm text-gray-300 mb-4">
              Ricarica la pagina o torna alla home. Se il problema persiste, segnalalo.
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-primary text-white" onClick={() => window.location.reload()}>
                Ricarica
              </button>
              <a href="/" className="px-3 py-1 rounded border border-border hover:bg-muted/40">
                Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
