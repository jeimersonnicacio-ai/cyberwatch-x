import { useState } from "react";
import { getCertificate } from "../data/certificates";
import "./CertificateVerification.css";

function getVerificationId() {
  const hash = window.location.hash.replace(/^#/, "");
  const params = new URLSearchParams(hash);
  return params.get("verify")?.trim().toUpperCase() || "";
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function CertificateVerification({ onBack }) {
  const [certificateId, setCertificateId] = useState(getVerificationId);
  const [searchedId, setSearchedId] = useState(getVerificationId);
  const certificate = getCertificate(searchedId);

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = certificateId.trim().toUpperCase();
    setSearchedId(normalized);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#verify=${encodeURIComponent(normalized)}`,
    );
  }

  return (
    <main className="certificate-verification-page">
      <section className="verification-card">
        <div className="verification-brand">CYBERWATCH X // ACADEMY</div>

        <p className="verification-kicker">VALIDADOR PÚBLICO</p>
        <h1>Validar certificado</h1>
        <p className="verification-description">
          Informe o ID do certificado para consultar o registro público da
          CyberWatch X Academy.
        </p>
        <p className="verification-description">
          Versão de demonstração: certificados emitidos a alunos só podem ser
          validados no mesmo navegador em que foram gerados.
        </p>

        <form className="verification-form" onSubmit={handleSubmit}>
          <label htmlFor="certificate-id">ID DO CERTIFICADO</label>
          <input
            id="certificate-id"
            type="text"
            value={certificateId}
            onChange={(event) => setCertificateId(event.target.value)}
            placeholder="Ex.: CWX-DEMO0001"
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit">CONSULTAR ID</button>
        </form>

        {searchedId && (
          certificate ? (
            <>
              <div className="verification-status verification-valid">
                <span aria-hidden="true">✓</span>
                CERTIFICADO VÁLIDO
              </div>

              <p className="verification-kicker">REGISTRO ENCONTRADO</p>
              <h2>Certificado autenticado</h2>
              <p className="verification-description">
                O ID informado corresponde a um certificado registrado pela
                CyberWatch X Academy.
              </p>

              <div className="verification-details">
                <div>
                  <span>TITULAR</span>
                  <strong>{certificate.holder}</strong>
                </div>
                <div>
                  <span>CURSO</span>
                  <strong>{certificate.course}</strong>
                </div>
                <div>
                  <span>ID DO CERTIFICADO</span>
                  <strong>{certificate.id}</strong>
                </div>
                <div>
                  <span>EMISSÃO</span>
                  <strong>{formatDate(certificate.issuedAt)}</strong>
                </div>
                <div>
                  <span>EMISSOR</span>
                  <strong>{certificate.issuer}</strong>
                </div>
                <div>
                  <span>STATUS</span>
                  <strong>{certificate.status}</strong>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="verification-status verification-invalid">
                <span aria-hidden="true">!</span>
                CERTIFICADO NÃO ENCONTRADO
              </div>

              <h2>Não foi possível validar</h2>
              <p className="verification-description">
                O ID informado não está registrado na base pública de
                certificados da CyberWatch X Academy.
              </p>

              <div className="verification-code">
                ID CONSULTADO: <strong>{searchedId}</strong>
              </div>
            </>
          )
        )}

        <button className="verification-back" onClick={onBack}>
          ← VOLTAR
        </button>
      </section>
    </main>
  );
}
