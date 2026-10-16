import { useState } from "react";
import "./ModulePage.css";

const moduleContent = {

  1: {
    title: "Fundamentos de Cibersegurança",

    text: `
A cibersegurança é o conjunto de práticas, tecnologias e processos utilizados para proteger sistemas, redes, dispositivos e informações contra ameaças digitais.

Os três pilares fundamentais são:

Confidencialidade:
garante que somente pessoas autorizadas tenham acesso às informações.

Integridade:
garante que os dados não sejam alterados de maneira indevida.

Disponibilidade:
garante que sistemas e informações estejam disponíveis quando necessários.
`,

    quiz: [
      {
        question:
          "Qual é um dos principais objetivos da cibersegurança?",

        options: [
          "Proteger sistemas e informações",
          "Aumentar o brilho do monitor",
          "Criar redes sociais",
          "Excluir todos os arquivos",
        ],

        answer: 0,
      },

      {
        question:
          "Qual pilar garante que somente pessoas autorizadas tenham acesso aos dados?",

        options: [
          "Disponibilidade",
          "Confidencialidade",
          "Velocidade",
          "Automação",
        ],

        answer: 1,
      },

      {
        question:
          "Qual pilar está relacionado à disponibilidade dos sistemas?",

        options: [
          "Disponibilidade",
          "Confidencialidade",
          "Integridade",
          "Criptografia",
        ],

        answer: 0,
      },
    ],
  },

  2: {
    title: "Ataques Cibernéticos",

    text: `
Ataques cibernéticos são ações realizadas para explorar vulnerabilidades em sistemas, redes ou aplicações.

Entre os ataques mais conhecidos estão:

Ransomware:
criptografa arquivos e exige pagamento.

Phishing:
utiliza mensagens falsas para enganar vítimas.

DDoS:
sobrecarrega um serviço com grande quantidade de requisições.

Malware:
software desenvolvido para causar danos ou obter acesso indevido.
`,

    quiz: [
      {
        question:
          "O que um ransomware normalmente tenta fazer?",

        options: [
          "Criptografar arquivos",
          "Melhorar a conexão",
          "Atualizar o Windows",
          "Criar backups",
        ],

        answer: 0,
      },

      {
        question:
          "Qual ataque tenta enganar o usuário através de mensagens falsas?",

        options: [
          "DDoS",
          "Phishing",
          "Backup",
          "Firewall",
        ],

        answer: 1,
      },

      {
        question:
          "Qual ataque tenta sobrecarregar um serviço com muitas requisições?",

        options: [
          "DDoS",
          "Phishing",
          "Ransomware",
          "Criptografia",
        ],

        answer: 0,
      },
    ],
  },

  3: {
    title: "Defesa Cibernética",

    text: `
A defesa cibernética utiliza tecnologias e processos para detectar, bloquear e responder a ameaças.

Alguns mecanismos importantes são:

Firewall
EDR
Antivírus
Backup Offline
MFA
IDS/IPS

Uma boa estratégia combina diferentes camadas de proteção.
`,

    quiz: [
      {
        question:
          "Qual tecnologia pode monitorar atividades suspeitas nos endpoints?",

        options: [
          "EDR",
          "HDMI",
          "Bluetooth",
          "Monitor",
        ],

        answer: 0,
      },

      {
        question:
          "Qual recurso ajuda a recuperar arquivos após um ransomware?",

        options: [
          "Backup Offline",
          "Phishing",
          "DDoS",
          "Spam",
        ],

        answer: 0,
      },

      {
        question:
          "O que representa uma boa estratégia de defesa?",

        options: [
          "Uma única proteção",
          "Nenhuma proteção",
          "Múltiplas camadas de segurança",
          "Somente uma senha",
        ],

        answer: 2,
      },
    ],
  },

  4: {
    title: "Inteligência Artificial",

    text: `
A Inteligência Artificial pode auxiliar equipes de segurança na análise de grandes quantidades de dados.

Ela pode identificar padrões, detectar comportamentos anormais, classificar eventos e auxiliar analistas durante investigações.

No CyberWatch X, a IA também pode ser utilizada para explicar eventos de segurança de maneira didática.
`,

    quiz: [
      {
        question:
          "Como a IA pode auxiliar a cibersegurança?",

        options: [
          "Analisando padrões e eventos",
          "Desligando todos os servidores",
          "Eliminando usuários",
          "Removendo backups",
        ],

        answer: 0,
      },

      {
        question:
          "A IA pode ajudar a detectar:",

        options: [
          "Comportamentos anormais",
          "Somente arquivos de música",
          "Temperatura do computador",
          "Brilho da tela",
        ],

        answer: 0,
      },

      {
        question:
          "No CyberWatch X, a IA também pode:",

        options: [
          "Explicar eventos de segurança",
          "Excluir a internet",
          "Desligar o computador",
          "Trocar o teclado",
        ],

        answer: 0,
      },
    ],
  },

  5: {
    title: "Inteligência de Ameaças",

    text: `
Threat Intelligence é o processo de coleta, análise e utilização de informações sobre ameaças cibernéticas.

O objetivo é compreender quem pode atacar, quais técnicas podem ser utilizadas e quais organizações podem estar em risco.

Essas informações ajudam equipes de segurança a tomar decisões preventivas.
`,

    quiz: [
      {
        question:
          "O que é Threat Intelligence?",

        options: [
          "Inteligência sobre ameaças",
          "Um antivírus",
          "Um sistema operacional",
          "Uma linguagem de programação",
        ],

        answer: 0,
      },

      {
        question:
          "Qual é um objetivo da Threat Intelligence?",

        options: [
          "Compreender ameaças",
          "Excluir servidores",
          "Desativar firewalls",
          "Remover logs",
        ],

        answer: 0,
      },

      {
        question:
          "Threat Intelligence pode ajudar equipes a:",

        options: [
          "Tomar decisões preventivas",
          "Desativar a segurança",
          "Excluir usuários",
          "Apagar backups",
        ],

        answer: 0,
      },
    ],
  },

  6: {
    title: "SOC — Centro de Operações de Segurança",

    text: `
Um SOC (Security Operations Center) é responsável pelo monitoramento contínuo de eventos de segurança.

Analistas de SOC investigam alertas, identificam comportamentos suspeitos e ajudam a responder a incidentes.

Um SOC moderno pode funcionar 24 horas por dia.
`,

    quiz: [
      {
        question:
          "O que significa SOC?",

        options: [
          "Security Operations Center",
          "System Online Computer",
          "Secure Office Control",
          "Software Operations Code",
        ],

        answer: 0,
      },

      {
        question:
          "Uma função de um SOC é:",

        options: [
          "Monitorar eventos de segurança",
          "Criar jogos",
          "Editar vídeos",
          "Formatar computadores",
        ],

        answer: 0,
      },

      {
        question:
          "Um SOC pode funcionar:",

        options: [
          "24 horas por dia",
          "Somente uma hora por semana",
          "Somente aos domingos",
          "Sem monitoramento",
        ],

        answer: 0,
      },
    ],
  },

  7: {
    title: "SIEM",

    text: `
SIEM significa Security Information and Event Management.

Uma plataforma SIEM coleta e centraliza logs e eventos de diferentes sistemas.

Essas informações podem ser correlacionadas para ajudar na identificação de incidentes de segurança.
`,

    quiz: [
      {
        question:
          "O que significa SIEM?",

        options: [
          "Security Information and Event Management",
          "System Internet Emergency Mode",
          "Secure Internal Enterprise Monitor",
          "Software Information Engine Manager",
        ],

        answer: 0,
      },

      {
        question:
          "O SIEM trabalha principalmente com:",

        options: [
          "Logs e eventos",
          "Somente imagens",
          "Somente vídeos",
          "Somente áudio",
        ],

        answer: 0,
      },

      {
        question:
          "A correlação de eventos pode ajudar a:",

        options: [
          "Identificar incidentes",
          "Desligar monitores",
          "Excluir usuários",
          "Formatar servidores",
        ],

        answer: 0,
      },
    ],
  },

  8: {
    title: "Confiança Zero — Zero Trust",

    text: `
Zero Trust é um modelo de segurança baseado no princípio de nunca confiar automaticamente.

Cada acesso deve ser verificado de acordo com identidade, dispositivo, contexto e permissões.

O objetivo é reduzir o impacto de acessos indevidos dentro de uma organização.
`,

    quiz: [
      {
        question:
          "Qual é um princípio do Zero Trust?",

        options: [
          "Nunca confiar automaticamente",
          "Confiar em todos",
          "Desativar autenticação",
          "Compartilhar senhas",
        ],

        answer: 0,
      },

      {
        question:
          "No Zero Trust, os acessos devem ser:",

        options: [
          "Verificados",
          "Sempre permitidos",
          "Ignorados",
          "Anônimos",
        ],

        answer: 0,
      },

      {
        question:
          "Zero Trust busca reduzir:",

        options: [
          "Acesso indevido",
          "Segurança",
          "Monitoramento",
          "Autenticação",
        ],

        answer: 0,
      },
    ],
  },
};

export default function ModulePage({
  module,
  alreadyCompleted = false,
  onBack,
  onComplete,
}) {

  const content = moduleContent[module.id];

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

  const [finished, setFinished] =
    useState(alreadyCompleted);

  const [score, setScore] =
    useState(alreadyCompleted ? content.quiz.length : 0);

  const [attempted, setAttempted] =
    useState(false);

  const handleAnswer = (questionIndex, answer) => {

    setSelectedAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));

  };

  const finishQuiz = () => {

    let correct = 0;

    content.quiz.forEach((question, index) => {

      if (
        selectedAnswers[index] === question.answer
      ) {
        correct++;
      }

    });

    setScore(correct);

    setAttempted(true);

    if (correct === content.quiz.length) {

      setFinished(true);

      onComplete(module.id);

    } else {

      setFinished(false);

    }

  };

  return (

    <main className="module-page">

      <button
        className="module-back"
        onClick={onBack}
      >
        ← VOLTAR PARA ACADEMY
      </button>

      <header className="module-header">

        <span>
          MÓDULO {String(module.id).padStart(2, "0")}
        </span>

        <h1>
          {content.title}
        </h1>

        <div className="module-level">
          {module.level}
        </div>

      </header>

      <section className="module-content">

        <div className="module-material">

          <div className="module-section-title">
            MATERIAL DE TREINAMENTO
          </div>

          {content.text
            .trim()
            .split("\n")
            .map((line, index) => (

              <p key={index}>
                {line.trim()}
              </p>

            ))}

        </div>

        <div className="module-quiz">

          <div className="module-section-title">
            QUIZ DE CERTIFICAÇÃO
          </div>

          <p className="quiz-info">
            Responda corretamente às 3 perguntas
            para concluir este módulo.
          </p>

          {content.quiz.map((question, index) => (

            <div
              className="quiz-question"
              key={index}
            >

              <h3>
                {index + 1}. {question.question}
              </h3>

              <div className="quiz-options">

                {question.options.map(
                  (option, optionIndex) => (

                    <button
                      key={optionIndex}
                      className={
                        selectedAnswers[index] ===
                        optionIndex
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        handleAnswer(
                          index,
                          optionIndex
                        )
                      }
                    >
                      {option}
                    </button>

                  )
                )}

              </div>

            </div>

          ))}

          {!finished ? (

            <button
              className="quiz-finish"
              onClick={finishQuiz}
            >
              FINALIZAR QUIZ →
            </button>

          ) : (

            <div className="quiz-success">

              <strong>
                ✓ MÓDULO CONCLUÍDO
              </strong>

              <span>
                Você acertou {score}/{content.quiz.length} perguntas.
              </span>

              <button onClick={onBack}>
                VOLTAR PARA A ACADEMY
              </button>

            </div>

          )}

          {attempted && !finished && (

            <div className="quiz-error">

              Você acertou {score}/{content.quiz.length}.

              <br />

              Revise o material e tente novamente.

            </div>

          )}

        </div>

      </section>

    </main>

  );
}