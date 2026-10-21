import { Component } from "react";

export default class AppErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("CyberWatch X encontrou um erro ao renderizar.", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main
        role="alert"
        style={{
          minHeight: "100vh",
          boxSizing: "border-box",
          display: "grid",
          placeContent: "center",
          gap: "16px",
          padding: "32px",
          background: "#020611",
          color: "#eafaff",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#00eaff", letterSpacing: "0.12em" }}>CYBERWATCH X</h1>
        <p>O aplicativo encontrou um erro ao iniciar.</p>
        <p>Recarregue a página. Se o problema continuar, consulte o Console do navegador.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            justifySelf: "center",
            padding: "12px 20px",
            border: "1px solid #00eaff",
            background: "transparent",
            color: "#00eaff",
            cursor: "pointer",
          }}
        >
          Recarregar aplicativo
        </button>
        {import.meta.env.DEV && this.state.error && (
          <pre style={{ maxWidth: "min(800px, 90vw)", whiteSpace: "pre-wrap", textAlign: "left" }}>
            {String(this.state.error.message || this.state.error)}
          </pre>
        )}
      </main>
    );
  }
}
