import { Component, type ErrorInfo, type ReactNode } from "react";

/* App-wide safety net: if any section throws during render, show a friendly
   fallback instead of a blank white page. Users can reload or jump home. */

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface it in the console for debugging (no external reporting service).
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="crash-fallback" role="alert">
          <div className="crash-card">
            <div className="tok-com">{"// something broke while rendering"}</div>
            <h2>Oops — the page hit a snag</h2>
            <p className="tok-dim">
              This is usually temporary. Try reloading; if it keeps happening,
              email <a href="mailto:delacruzjrome@gmail.com">delacruzjrome@gmail.com</a>.
            </p>
            <div className="crash-actions">
              <button type="button" onClick={() => window.location.reload()}>
                Reload page
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ error: null });
                  window.location.hash = "#home";
                }}
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
