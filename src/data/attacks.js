export const countries = [
  "Brazil",
  "United States",
  "Germany",
  "United Kingdom",
  "France",
  "Japan",
  "China",
  "Russia",
  "Canada",
  "Australia",
  "South Korea",
  "India",
];

export const companies = [
  {
    name: "Petrobras",
    country: "Brazil",
  },

  {
    name: "Banco Caixa",
    country: "Brazil",
  },

  {
    name: "Banco C6",
    country: "Brazil",
  },

  {
    name: "Apple",
    country: "United States",
  },

  {
    name: "Microsoft",
    country: "United States",
  },

  {
    name: "Amazon",
    country: "United States",
  },

  {
    name: "Siemens",
    country: "Germany",
  },

  {
    name: "BMW",
    country: "Germany",
  },

  {
    name: "Samsung",
    country: "South Korea",
  },

  {
    name: "Toyota",
    country: "Japan",
  },

  {
    name: "Sony",
    country: "Japan",
  },

  {
    name: "Airbus",
    country: "France",
  },

  {
    name: "HSBC",
    country: "United Kingdom",
  },

  {
    name: "Shopify",
    country: "Canada",
  },

  {
    name: "Infosys",
    country: "India",
  },
];

export const attackTypes = [
  {
    name: "Ransomware",

    description:
      "O invasor tentou executar um software malicioso para criptografar os arquivos.",
  },

  {
    name: "Phishing",

    description:
      "O invasor tentou enganar funcionários para obter credenciais e informações confidenciais.",
  },

  {
    name: "DDoS",

    description:
      "O invasor tentou sobrecarregar os serviços da empresa com uma grande quantidade de requisições.",
  },

  {
    name: "Malware",

    description:
      "O invasor tentou executar software malicioso dentro da infraestrutura da empresa.",
  },

  {
    name: "Supply Chain Attack",

    description:
      "O invasor tentou comprometer um fornecedor para alcançar a infraestrutura da empresa.",
  },

  {
    name: "Credential Attack",

    description:
      "O invasor tentou utilizar credenciais comprometidas para obter acesso aos sistemas.",
  },
];

export const defenses = [
  "EDR + Backup Offline",

  "MFA + Zero Trust",

  "Firewall + DDoS Protection",

  "EDR + SIEM",

  "Zero Trust + Network Segmentation",

  "XDR + Threat Intelligence",

  "MFA + EDR + SOC",
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomSuccessChance() {
  return Math.floor(Math.random() * 70) + 10;
}

export function generateAttack() {
  const company = randomItem(companies);

  let attackerCountry;

  do {
    attackerCountry = randomItem(countries);
  } while (attackerCountry === company.country);

  const attack = randomItem(attackTypes);

  const defense = randomItem(defenses);

  const successChance = randomSuccessChance();

  const success =
    Math.random() * 100 < successChance;

  let threat = "LOW";

  if (successChance >= 35 && successChance < 60) {
    threat = "MEDIUM";
  }

  if (successChance >= 60) {
    threat = "HIGH";
  }

  if (successChance >= 80) {
    threat = "CRITICAL";
  }

  return {
    attackerCountry,

    company: company.name,

    targetCountry: company.country,

    attackType: attack.name,

    attackDescription: attack.description,

    defense,

    successChance,

    result: success ? "SUCCESS" : "FAILED",

    threat,

    timestamp: new Date().toLocaleTimeString(),
  };
}