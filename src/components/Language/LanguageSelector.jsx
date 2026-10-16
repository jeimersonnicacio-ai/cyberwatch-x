import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      className="language-selector"
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      aria-label="Language / Idioma"
    >
      {Object.entries(translations).map(([code, dictionary]) => (
        <option key={code} value={code}>
          {dictionary.language}
        </option>
      ))}
    </select>
  );
}
