import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../locales";

const LANGUAGE_KEY = "cyberwatch:v4:language";
const DEFAULT_LANGUAGE = "pt-BR";

const LanguageContext = createContext(null);

function loadLanguage() {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    return saved && translations[saved] ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(loadLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (code) => {
    if (!translations[code]) return;

    setLanguageState(code);

    try {
      window.localStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      /* storage unavailable: keep the choice for this session only */
    }
  };

  const t = (key) => {
    const value = key
      .split(".")
      .reduce((current, part) => current?.[part], translations[language]);

    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }

  return context;
}
