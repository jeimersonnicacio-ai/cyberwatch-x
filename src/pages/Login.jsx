import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/Language/LanguageSelector";
import { loginUser } from "../services/userStore";
import "./Login.css";

export default function Login({ onLogin, onExit }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const result = await loginUser({ name, email });

      if (!result.ok) {
        setError(t(`login.errors.${result.error}`));
        return;
      }

      onLogin(result.user);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-screen">
      <button className="login-exit" onClick={onExit}>
        {t("buttons.exit")}
      </button>

      <div className="login-grid" />

      <main className="login-content">
        <div className="login-logo">CYBERWATCH X</div>

        <div className="login-title">{t("login.title")}</div>
        <div className="login-line" />

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder={t("login.name")}
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            maxLength={80}
          />

          <input
            type="email"
            placeholder={t("login.email")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />

          <button type="submit" disabled={submitting}>
            {t("login.enter")}
          </button>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
        </form>

        <p className="login-privacy">{t("login.privacy")}</p>

        <div className="login-language">
          <LanguageSelector />
        </div>
      </main>
    </div>
  );
}
