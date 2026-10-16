import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./CyberExperience.css";

const STEPS = [
  "intro.loadingAI",
  "intro.loadingSensors",
  "intro.loadingSatellites",
  "intro.loadingThreatIntel",
  "intro.loadingCompanies",
  "intro.aiOnline",
];

export default function CyberExperience({ onComplete, onExit }) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const step = Math.min(Math.floor(progress / 17), STEPS.length - 1);

  useEffect(() => {
    let currentProgress = 0;
    let completionTimeout;

    const interval = setInterval(() => {
      currentProgress = Math.min(currentProgress + 2, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        completionTimeout = setTimeout(() => onComplete(), 1000);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <div className="cyber-experience">
      <button className="cyber-exit" onClick={onExit}>
        {t("buttons.exit")}
      </button>

      <div className="cyber-grid" />
      <div className="cyber-content">
        <div className="cyber-logo">CYBERWATCH X</div>
        <div className="cyber-subtitle">{t("intro.company")}</div>
        <div className="cyber-description">{t("intro.description")}</div>
        <div className="cyber-status">{t(STEPS[step])}</div>
        <div className="cyber-progress">
          <div className="cyber-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="cyber-percent">{progress}%</div>
      </div>
    </div>
  );
}
