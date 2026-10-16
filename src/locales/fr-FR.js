export default {
  language: "Français",

  login: {
    title: "Accès au Centre de Défense",
    name: "Nom complet",
    email: "E-mail",
    enter: "ENTRER",
    privacy: "Votre progression est enregistrée uniquement dans ce navigateur. L'e-mail n'est pas stocké.",
    errors: {
      required: "LE NOM ET L'E-MAIL SONT OBLIGATOIRES.",
      invalid_email: "SAISISSEZ UN E-MAIL VALIDE.",
      name_mismatch: "CET E-MAIL EST DÉJÀ ENREGISTRÉ AVEC UN AUTRE NOM.",
    },
  },

  buttons: {
    exit: "QUITTER",
    continue: "CONTINUER",
  },

  dashboard: "Tableau de bord",
  attacks: "Attaques",
  defense: "Défense",
  protected: "Protégé",
  winner: "Gagnant",
  monitoring: "SURVEILLANCE MONDIALE ACTIVE",
  threat: "Niveau de menace",
  explanation: "Explication de l'IA",
  companies: "Entreprises",
  country: "Pays",
  attackType: "Type d'attaque",
  defenseType: "Défense",
  success: "Probabilité de réussite",
  result: "Résultat",

  securityAwareness: {
    ariaLabel: "Alerte de sensibilisation à la cybersécurité",
    userLabel: "UTILISATEUR",
    title: "VOUS AVEZ ÉTÉ PIRATÉ",
    message:
      "CYBERWATCH-X VOUS AVERTIT ! NE CLIQUEZ JAMAIS SUR DES LIENS ET NE TÉLÉCHARGEZ JAMAIS DE FICHIERS AVANT D'EN VÉRIFIER LA VÉRITABLE SOURCE !",
  },

  ai: {
    explanation: "EXPLICATION DE L'IA",
    detected: "L'attaque détectée était un",
    attempt: "L'attaquant a tenté d'exécuter",
    defense: "L'entreprise disposait de",
    blocked: "Ces technologies ont empêché la réussite de l'intrusion.",
    compromised: "Les défenses ont été compromises et l'attaque a atteint l'environnement protégé.",
    successChance: "Probabilité de réussite de l'IA",
    result: "Résultat de l'IA",
    success: "SUCCÈS",
    failed: "ÉCHEC",
    threat: "Niveau de menace",
    attacker: "Attaquant",
    target: "Cible",
    simulation: "SIMULATION D'IA",
  },

  intro: {
    company: "CENTRE MONDIAL DE CYBERDÉFENSE",
    description:
      "CyberWatch X est une plateforme interactive conçue pour démontrer comment les cyberattaques se produisent chaque jour dans le monde grâce à des simulations en temps réel.",
    mission: "Notre Mission",
    missionText:
      "Sensibiliser, enseigner et rapprocher les gens de l'univers de la Sécurité de l'Information grâce à l'Intelligence Artificielle, à la visualisation 3D et à des expériences immersives.",
    welcome: "Bienvenue",
    loadingAI: "Initialisation de l'Intelligence Artificielle...",
    loadingSensors: "Connexion des Capteurs Mondiaux...",
    loadingSatellites: "Connexion au Réseau de Satellites...",
    loadingThreatIntel: "Synchronisation de la Threat Intelligence...",
    loadingCompanies: "Surveillance des Entreprises Mondiales...",
    aiOnline: "IA EN LIGNE",
  },

  academy: {
    title: "Académie",
    description:
      "Centre de formation CyberWatch X pour l'apprentissage et la sensibilisation à la Sécurité de l'Information.",
    online: "SYSTÈME DE FORMATION EN LIGNE",
    back: "RETOUR",
    start: "DÉMARRER LE MODULE",
    completed: "MODULE TERMINÉ",
    complete: "TERMINER LE MODULE",
    progress: "PROGRESSION DE LA FORMATION",
    simulationNotice:
      "Ce contenu fait partie d'une simulation éducative CyberWatch X.",
    certificateUnlocked: "CERTIFICAT DÉBLOQUÉ",
    allModulesCompleted: "Tous les modules de formation ont été terminés.",

    modules: {
      cybersecurity: {
        title: "Introduction à la Cybersécurité",
        description: "Découvrez les fondamentaux de la sécurité de l'information et des menaces numériques.",
        materialTitle: "Fondamentaux de la Cybersécurité",
        material: "Dans ce module, vous apprendrez les concepts fondamentaux de la sécurité de l'information, les menaces numériques, les vulnérabilités, les risques et les bonnes pratiques de protection.",
      },
      attacks: {
        title: "Types d'Attaques",
        description: "Découvrez le fonctionnement des ransomwares, du phishing, des DDoS et d'autres attaques.",
        materialTitle: "Cyberattaques",
        material: "Découvrez le fonctionnement d'attaques telles que le phishing, les ransomwares, les DDoS, les malwares et l'ingénierie sociale.",
      },
      defense: {
        title: "Cyberdéfense",
        description: "Découvrez les technologies utilisées pour détecter, bloquer et répondre aux attaques.",
        materialTitle: "Cyberdéfense",
        material: "Découvrez les pare-feux, l'EDR, les antivirus, les sauvegardes, la surveillance et d'autres technologies de défense.",
      },
      artificialIntelligence: {
        title: "Intelligence Artificielle",
        description: "Comprenez comment l'IA peut aider à l'analyse et à la détection des incidents.",
        materialTitle: "L'IA en Cybersécurité",
        material: "Découvrez comment l'Intelligence Artificielle et le Machine Learning peuvent aider à identifier des schémas, des menaces et des comportements suspects.",
      },
      threatIntelligence: {
        title: "Threat Intelligence",
        description: "Découvrez comment les informations sur les menaces peuvent améliorer la sécurité.",
        materialTitle: "Threat Intelligence",
        material: "Découvrez comment les informations sur les menaces peuvent être collectées, analysées et utilisées pour anticiper les attaques.",
      },
      soc: {
        title: "SOC",
        description: "Découvrez le fonctionnement d'un Security Operations Center.",
        materialTitle: "Centre d'Opérations de Sécurité",
        material: "Découvrez le fonctionnement d'un SOC, la surveillance continue, l'analyse des alertes et la réponse aux incidents.",
      },
      siem: {
        title: "SIEM",
        description: "Comprenez comment les événements de sécurité sont collectés, corrélés et analysés.",
        materialTitle: "SIEM",
        material: "Découvrez comment les plateformes SIEM centralisent les journaux et les événements pour aider à détecter et à enquêter sur les incidents.",
      },
      zeroTrust: {
        title: "Zero Trust",
        description: "Découvrez le concept consistant à ne jamais faire confiance automatiquement et à toujours vérifier.",
        materialTitle: "Architecture Zero Trust",
        material: "Comprenez le principe consistant à ne jamais faire confiance automatiquement et à toujours vérifier les utilisateurs, les appareils, les applications et les accès.",
      },
    },
  },

  certificate: {
    certifies: "Nous certifions que",
    completed: "a terminé avec succès tous les modules de CyberWatch X Academy.",
    emit: "ÉMETTRE LE CERTIFICAT",
    print: "IMPRIMER LE CERTIFICAT",
  },
};
