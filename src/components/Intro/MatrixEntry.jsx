import { useEffect } from "react";
import MatrixRain from "./MatrixRain";
import "./MatrixEntry.css";

export default function MatrixEntry({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 5200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <main className="matrix-entry">
      <MatrixRain />

      <div className="matrix-vignette" />

      <section className="matrix-entry-content" aria-live="assertive">
        <div className="matrix-terminal">// INCOMING CONNECTION</div>
        <div className="matrix-glitch" data-text="VOCÊ FOI HACKEADO">
          VOCÊ FOI HACKEADO
        </div>
        <div className="matrix-subline">CYBERWATCH X // ACCESS INTERCEPTED</div>
        <div className="matrix-loader">
          <span />
        </div>
        <p>SISTEMA COMPROMETIDO</p>
        <p className="matrix-redirect">REDIRECIONANDO PARA O CENTRO DE DEFESA...</p>
      </section>
    </main>
  );
}
