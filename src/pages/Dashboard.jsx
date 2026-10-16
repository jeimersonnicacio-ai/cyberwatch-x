import CyberGlobe from "../components/Globe/CyberGlobe";
import AIAttackPanel from "../components/Attack/AIAttackPanel";
import { useLanguage } from "../context/LanguageContext";
import useLocalClock from "../hooks/useLocalClock";
import useLiveAttackFeed from "../hooks/useLiveAttackFeed";
import LanguageSelector from "../components/Language/LanguageSelector";
import "../styles/dashboard.css";

const THREAT_ORDER = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

function winnerFromAttack(attack) {
  if (!attack) return { label: "BLUE TEAM", side: "defense-winner" };

  return attack.result === "SUCCESS"
    ? { label: "RED TEAM", side: "attack-winner" }
    : { label: "BLUE TEAM", side: "defense-winner" };
}

export default function Dashboard({ user, onAcademy, onExit }) {
  const { t } = useLanguage();
  const { time, timeZone } = useLocalClock();
  const { current: attack, feed, routes, totals } = useLiveAttackFeed();

  const profileName = user?.name || "USUÁRIO CYBERWATCH X";
  const winner = winnerFromAttack(attack);

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="topbar-brand">
          <div className="logo">CYBERWATCH X</div>
          <div className="logo-subtitle">GLOBAL CYBER DEFENSE CENTER</div>
        </div>

        <div className="topbar-controls">
          <LanguageSelector />

          <button className="dashboard-academy-button" onClick={onAcademy}>
            🎓 {t("academy.title")}
          </button>

          <div className="clock" title={`Fuso horário detectado: ${timeZone}`}>
            <span className="clock-dot" />
            LOCAL {time}
            <small>{timeZone}</small>
          </div>

          <button
            className="profile"
            type="button"
            title={`${profileName} // SPECTATOR`}
            onClick={onExit}
          >
            USER
          </button>
        </div>
      </header>

      <section className="security-awareness-banner" aria-label={t("securityAwareness.ariaLabel")}>
        <div className="security-awareness-user">{t("securityAwareness.userLabel")}: {profileName}</div>
        <div className="security-awareness-title">⚠ {t("securityAwareness.title")}</div>
        <div className="security-awareness-message">
          {t("securityAwareness.message")}
        </div>
      </section>

      <main className="content">
        <aside className="ai-panel-column">
          <AIAttackPanel key={attack?.timestamp} attack={attack} />

          <div className="live-feed cyber-panel">
            <h3>ATIVIDADE RECENTE</h3>
            {feed.map((event, index) => (
              <div
                className={`live-feed-item ${index === 0 ? "live-feed-item-new" : ""}`}
                key={`${event.timestamp}-${index}`}
              >
                <span
                  className={`live-feed-dot ${
                    event.result === "SUCCESS" ? "dot-attack" : "dot-defense"
                  }`}
                />
                <span className="live-feed-text">
                  <strong>{event.attackerCountry}</strong> → {event.company}
                  <em>{event.attackType}</em>
                </span>
                <span className="live-feed-time">{event.timestamp}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="center-panel">
          <CyberGlobe routes={routes} />
        </section>

        <aside className="right-panel">
          <div className="cyber-panel">
            <h3>GLOBAL STATUS</h3>
            <div className="status-item attack">
              <span>ATTACKS</span>
              <strong>{totals.attacks.toLocaleString("pt-BR")}</strong>
            </div>
            <div className="status-item defense">
              <span>DEFENSE</span>
              <strong>{totals.defense.toLocaleString("pt-BR")}</strong>
            </div>
            <div className="status-item protected">
              <span>PROTECTED</span>
              <strong>{totals.protected.toLocaleString("pt-BR")}</strong>
            </div>
            <div className="panel-divider"></div>
            <h3>WINNER</h3>
            <div className={`winner ${winner.side}`}>{winner.label}</div>
          </div>

          <div className="cyber-panel">
            <h3>CYBER AI</h3>
            <div className={`ai-status threat-tag-${attack?.threat?.toLowerCase()}`}>
              <span>THREAT LEVEL</span>
              <strong>{attack?.threat}</strong>
            </div>
            <div className="panel-divider"></div>
            <p className="data-label">LATEST EVENT</p>
            <p className="data-value">{attack?.attackType}</p>
            <p className="data-label">ORIGIN</p>
            <p className="data-value">{attack?.attackerCountry}</p>
            <p className="data-label">RECOMMENDATION</p>
            <p className="recommendation">🛡️ {attack?.defense}</p>
          </div>
        </aside>
      </main>

      <footer className="dashboard-footer">
        <span className="online-indicator"></span>
        SYSTEM ONLINE
        <span className="footer-separator">|</span>
        DATA MODE: SIMULATION
        <span className="footer-separator">|</span>
        GLOBAL SENSORS: ACTIVE
        <span className="footer-separator">|</span>
        THREAT INDEX: {THREAT_ORDER.indexOf(attack?.threat) + 1}/4
      </footer>
    </div>
  );
}
