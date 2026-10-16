export function analyzeAttack(attack) {
  if (!attack) {
    return null;
  }

  const {
    attackerCountry,
    company,
    targetCountry,
    attackType,
    attackDescription,
    defense,
    successChance,
    result,
    threat,
    timestamp,
  } = attack;

  const aiMessage =
    result === "SUCCESS"
      ? "A defesa da empresa foi comprometida e o ataque conseguiu alcançar o ambiente protegido."
      : "As defesas da empresa detectaram e bloquearam a tentativa de invasão.";

  return {
    title: "AI EXPLANATION",
    attackerCountry,
    company,
    targetCountry,
    attackType,
    attackDescription,
    defense,
    successChance,
    result,
    threat,
    timestamp,
    aiMessage,
    summary: {
      attack: `O ataque detectado foi um ${attackType}.`,
      attempt: attackDescription,
      protection: `A empresa possuía ${defense}.`,
      defenseResult: aiMessage,
      chance: `Chance de sucesso: ${successChance}%`,
      finalResult: `Resultado: ${result}`,
    },
  };
}
