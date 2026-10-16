import { lookupIssuedCertificate } from "../services/userStore";

/**
 * Demo registry used by the public verifier.
 *
 * It holds a single sample record with no personal data. Certificates issued
 * to students are stored in the browser that issued them (see
 * services/userStore.js), so they can only be verified in that same browser.
 * For production, move both registries to a backend/database and validate
 * certificates server-side.
 */
export const demoCertificates = {
  "CWX-DEMO0001": {
    id: "CWX-DEMO0001",
    holder: "ALUNO CYBERWATCH X",
    course: "FUNDAMENTOS DE CIBERSEGURANÇA",
    issuedAt: "2026-01-01T12:00:00-03:00",
    issuer: "CYBERWATCH X ACADEMY",
    status: "VALIDO",
  },
};

export function getCertificate(id) {
  const key = String(id ?? "").trim().toUpperCase();

  if (!key) return null;

  return demoCertificates[key] ?? lookupIssuedCertificate(key);
}
