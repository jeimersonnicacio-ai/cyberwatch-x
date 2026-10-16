# CyberWatch X

Simulador **educacional** de ataques e defesas cibernéticas. Um painel imersivo mostra, em tempo real, ataques fictícios entre países e empresas, e uma IA explica cada evento: que tipo de ataque foi, qual defesa a empresa tinha, a chance de sucesso e o resultado. A **CyberWatch X Academy** ensina os conceitos em 8 módulos com quiz e emite um certificado digital.

> Todos os dados exibidos no painel são simulados. Nenhum ataque real é executado.

## Recursos

- Terra, Lua, Sol e satélites em 3D, com linhas de ataque/defesa que se alternam a cada novo evento
- Painel de IA que explica ataque, defesa, ameaça e resultado (mensagens ampliadas para leitura)
- Entrada estilo Matrix e alerta de conscientização
- Relógio no **fuso horário do computador** do usuário
- Academy com 8 módulos, quiz de 3 perguntas por módulo e progresso salvo por aluno
- Certificado com ID único por aluno e validador por ID
- Interface em 5 idiomas: português, inglês, espanhol, francês e alemão

## Tecnologias

React 19, Vite, Three.js, React Three Fiber e Drei.

## Como executar

Requer Node.js 20 LTS ou superior (recomendado 22 LTS).

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

Outros comandos:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a versão de produção localmente
npm run lint      # verifica o código com ESLint
```

## Contas e progresso por usuário

O login pede **nome e e-mail**. Cada pessoa recebe um registro isolado:

- O registro é identificado por um hash SHA-256 do e-mail. **O e-mail não é armazenado.**
- O progresso dos módulos e o certificado ficam salvos no `localStorage` do navegador, separados por aluno.
- Um e-mail já cadastrado só entra com o mesmo nome. Assim, "João Pedro" não acessa a conta de "Ana Clara", e "Ana Clara" não acessa a de "Maria Fernanda".
- Ao sair, nada do aluno permanece em memória; ao entrar de novo, o progresso é restaurado.

### Limites desta versão (sem servidor)

Não há banco de dados nem servidor. Por isso:

- Os dados existem apenas no navegador/dispositivo onde foram criados.
- Nome e e-mail não são segredos: isto separa contas, mas **não é autenticação**. Quem souber o nome e o e-mail de outra pessoa e usar o mesmo navegador poderia entrar na conta dela.
- Certificados emitidos só são validados no mesmo navegador em que foram gerados.

Para contas reais em vários dispositivos, senha e validação pública de certificados, substitua `src/services/userStore.js` por uma API com banco de dados (por exemplo Supabase, Firebase ou Node com SQLite/PostgreSQL).

## Certificados

Ao concluir os 8 módulos, o aluno emite o certificado, com ID único no formato `CWX-XXXXXXXX`. O validador aceita o ID e também links no formato `/#verify=CWX-XXXXXXXX`. O ID `CWX-DEMO0001` é um exemplo fixo, sem dados pessoais (`src/data/certificates.js`).

## Publicação no GitHub Pages

O repositório inclui `.github/workflows/deploy.yml`. Depois de enviar o projeto para a branch `main`, abra **Settings → Pages → Source: GitHub Actions**. O build e a publicação passam a ser automáticos a cada push. O Vite usa `base: "./"`, então funciona em `https://usuario.github.io/repositorio/`.

## Estrutura

```text
src/
  components/   Globe, Attack (painel de IA), Intro, Language
  context/      LanguageContext (idioma salvo no navegador)
  data/         ataques simulados e registro demo de certificados
  hooks/        useLiveAttackFeed (ciclo de ataques e rotas), useLocalClock
  locales/      pt-BR, en-US, es-ES, fr-FR, de-DE
  pages/        Login, Dashboard, Academy, ModulePage, Certificate, verificação
  services/     userStore (contas, progresso, certificados), globeRoutes, IA
  styles/       estilos globais e do dashboard
```

## Privacidade

O código-fonte não contém nomes, e-mails, chaves ou credenciais. Dados de login ficam apenas no navegador de quem usa. A fonte Orbitron é carregada do Google Fonts.
