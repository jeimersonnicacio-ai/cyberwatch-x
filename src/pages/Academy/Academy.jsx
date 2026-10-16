import { useLanguage } from "../../context/LanguageContext";
import "./Academy.css";

const modules = [
  { id: 1, icon: "🛡️", key: "cybersecurity", level: "BÁSICO" },
  { id: 2, icon: "⚔️", key: "attacks", level: "BÁSICO" },
  { id: 3, icon: "🔐", key: "defense", level: "INTERMEDIÁRIO" },
  { id: 4, icon: "🤖", key: "artificialIntelligence", level: "INTERMEDIÁRIO" },
  { id: 5, icon: "🌐", key: "threatIntelligence", level: "AVANÇADO" },
  { id: 6, icon: "🖥️", key: "soc", level: "AVANÇADO" },
  { id: 7, icon: "📊", key: "siem", level: "AVANÇADO" },
  { id: 8, icon: "🔒", key: "zeroTrust", level: "AVANÇADO" },
];

export default function Academy({
  userName,
  completedModules = [],
  onModuleSelect,
  onCertificate,
  onExit,
}) {
  const { t } = useLanguage();
  const completed = completedModules.map(Number);
  const completedCount = modules.filter((module) => completed.includes(module.id)).length;
  const progress = Math.round((completedCount / modules.length) * 100);
  const courseCompleted = completedCount === modules.length;

  return (
    <main className="academy-page">
      <button className="academy-exit" onClick={onExit}>
        {t("buttons.exit")}
      </button>

      <header className="academy-header">
        <div className="academy-tag">CYBERWATCH X // SISTEMA EDUCACIONAL</div>
        <h1>CYBERWATCH X ACADEMY</h1>
        <p>{t("academy.description")}</p>
        <div className="academy-status"><span>●</span>{t("academy.online")}</div>
      </header>

      <section className="academy-progress">
        <div className="academy-progress-header">
          <span>PROGRESSO DO TREINAMENTO</span>
          <strong>{completedCount} / {modules.length}</strong>
        </div>
        <div className="academy-progress-track">
          <div className="academy-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="academy-progress-info">
          <span>{progress}%</span>
          <span>{courseCompleted ? "CURSO CONCLUÍDO" : "TREINAMENTO EM ANDAMENTO"}</span>
        </div>
      </section>

      <section className="academy-grid">
        {modules.map((module) => {
          const isDone = completed.includes(module.id);
          return (
            <article className={`academy-card ${isDone ? "academy-card-completed" : ""}`} key={module.id}>
              <div className="academy-card-number">{String(module.id).padStart(2, "0")}</div>
              <div className={`academy-card-icon ${isDone ? "academy-icon-completed" : ""}`}>
                {isDone ? "✓" : module.icon}
              </div>
              <div className="academy-card-content">
                <span className="academy-level">{module.level}</span>
                <h2>{t(`academy.modules.${module.key}.title`)}</h2>
                <p>{t(`academy.modules.${module.key}.description`)}</p>
                <button
                  className={`academy-start ${isDone ? "academy-start-completed" : ""}`}
                  onClick={() => onModuleSelect?.(module)}
                >
                  {isDone ? "MÓDULO CONCLUÍDO" : "INICIAR MÓDULO"}
                  <span>{isDone ? "✓" : "→"}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className={`academy-certificate ${courseCompleted ? "academy-certificate-unlocked" : ""}`}>
        <div className="academy-certificate-icon">{courseCompleted ? "🏆" : "🔒"}</div>
        <div className="academy-certificate-content">
          <span>CYBERWATCH X ACADEMY</span>
          <h2>{courseCompleted ? "CERTIFICADO DESBLOQUEADO" : "CERTIFICADO BLOQUEADO"}</h2>
          <p>
            {courseCompleted
              ? `Parabéns, ${userName || "aluno"}. Todos os módulos foram concluídos.`
              : `Conclua os ${modules.length} módulos para liberar seu certificado.`}
          </p>
        </div>
        {courseCompleted && (
          <button className="certificate-button" onClick={onCertificate}>
            EMITIR CERTIFICADO →
          </button>
        )}
      </section>
    </main>
  );
}
