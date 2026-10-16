import { useLanguage } from "../../context/LanguageContext";
import "./AIAttackPanel.css";

export default function AIAttackPanel({ attack }) {
  const { t } = useLanguage();

  if (!attack) {
    return null;
  }

  const resultText =
    attack.result === "SUCCESS"
      ? t("ai.success")
      : t("ai.failed");

  return (
    <section className={`ai-attack-panel threat-${attack.threat.toLowerCase()}`}>

      <div className="ai-panel-header">

        <div className="ai-icon">
          🤖
        </div>

        <div>
          <div className="ai-panel-title">
            {t("ai.explanation")}
          </div>

          <div className="ai-panel-subtitle">
            {t("ai.simulation")}
          </div>
        </div>

        <div className="ai-online">
          ● AI ONLINE
        </div>

      </div>


      <div className="ai-attack-route">

        <div className="ai-location">

          <span className="ai-location-label">
            {t("ai.attacker")}
          </span>

          <strong>
            {attack.attackerCountry}
          </strong>

        </div>


        <div className="ai-arrow">
          →
        </div>


        <div className="ai-location">

          <span className="ai-location-label">
            {t("ai.target")}
          </span>

          <strong>
            {attack.company}
          </strong>

          <small>
            {attack.targetCountry}
          </small>

        </div>

      </div>


      <div className="ai-threat">

        <span>
          {t("ai.threat")}
        </span>

        <strong>
          {attack.threat}
        </strong>

      </div>


      <div className="ai-section">

        <div className="ai-section-title">
          {t("ai.detected")}
        </div>

        <div className="ai-attack-type">
          {attack.attackType}
        </div>

        <p>
          {attack.attackDescription}
        </p>

      </div>


      <div className="ai-section">

        <div className="ai-section-title">
          {t("ai.defense")}
        </div>

        <div className="ai-defense">
          🛡️ {attack.defense}
        </div>

      </div>


      <div className="ai-chance">

        <span>
          {t("ai.successChance")}
        </span>

        <strong>
          {attack.successChance}%
        </strong>

      </div>


      <div className="ai-result">

        <span>
          {t("ai.result")}
        </span>

        <strong className={`result-${attack.result.toLowerCase()}`}>
          {resultText}
        </strong>

      </div>


      <div className="ai-message">

        <span className="ai-message-label">
          AI
        </span>

        <p>
          {attack.result === "SUCCESS"
            ? t("ai.compromised")
            : t("ai.blocked")}
        </p>

      </div>

    </section>
  );
}