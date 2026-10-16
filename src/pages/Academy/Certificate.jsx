import { useLanguage } from "../../context/LanguageContext";
import "./Certificate.css";

function formatIssueDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function Certificate({ certificate, onBack, onValidate }) {
  const { t } = useLanguage();

  function openValidator() {
    window.location.hash = `verify=${encodeURIComponent(certificate.id)}`;
    onValidate();
  }

  return (
    <main className="certificate-page">
      <button className="certificate-back" onClick={onBack}>
        ← {t("academy.back")}
      </button>

      <section className="certificate">
        <div className="certificate-grid"></div>

        <div className="certificate-header">
          <span>CYBERWATCH X // ACADEMY</span>
          <h1>CERTIFICADO</h1>
          <div className="certificate-line"></div>
        </div>

        <p className="certificate-text">{t("certificate.certifies")}</p>

        <h2 className="certificate-name">{certificate.holder}</h2>

        <p className="certificate-text">{t("certificate.completed")}</p>

        <h3>{certificate.course}</h3>

        <div className="certificate-footer">
          <div>
            <span>ID DO CERTIFICADO</span>
            <strong>{certificate.id}</strong>
            <small className="certificate-verify-hint">
              Emitido em {formatIssueDate(certificate.issuedAt)}
            </small>
          </div>
        </div>

        <div className="certificate-brand">CYBERWATCH X</div>
      </section>

      <div className="certificate-actions">
        <button className="certificate-verify" onClick={openValidator}>
          VALIDAR CERTIFICADO
        </button>
        <button className="certificate-print" onClick={() => window.print()}>
          {t("certificate.print")}
        </button>
      </div>
    </main>
  );
}
