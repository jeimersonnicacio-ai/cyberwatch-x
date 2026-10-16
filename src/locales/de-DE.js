export default {
  language: "Deutsch",

  login: {
    title: "Zugang zum Verteidigungszentrum",
    name: "Vollständiger Name",
    email: "E-Mail",
    enter: "EINTRETEN",
    privacy: "Dein Fortschritt wird nur in diesem Browser gespeichert. Die E-Mail wird nicht gespeichert.",
    errors: {
      required: "NAME UND E-MAIL SIND ERFORDERLICH.",
      invalid_email: "GIB EINE GÜLTIGE E-MAIL EIN.",
      name_mismatch: "DIESE E-MAIL IST BEREITS MIT EINEM ANDEREN NAMEN REGISTRIERT.",
    },
  },

  buttons: {
    exit: "VERLASSEN",
    continue: "WEITER",
  },

  dashboard: "Übersicht",
  attacks: "Angriffe",
  defense: "Verteidigung",
  protected: "Geschützt",
  winner: "Gewinner",
  monitoring: "GLOBALE ÜBERWACHUNG AKTIV",
  threat: "Bedrohungsstufe",
  explanation: "KI-Erklärung",
  companies: "Unternehmen",
  country: "Land",
  attackType: "Angriffsart",
  defenseType: "Verteidigung",
  success: "Erfolgswahrscheinlichkeit",
  result: "Ergebnis",

  securityAwareness: {
    ariaLabel: "Warnung zur Cybersicherheits-Sensibilisierung",
    userLabel: "BENUTZER",
    title: "SIE WURDEN GEHACKT",
    message:
      "CYBERWATCH-X WARNT! KLICKEN SIE NIEMALS AUF LINKS UND LADEN SIE KEINE DATEIEN HERUNTER, OHNE ZUVOR DIE ECHTE QUELLE ZU PRÜFEN!",
  },

  ai: {
    explanation: "KI-ERKLÄRUNG",
    detected: "Der erkannte Angriff war ein",
    attempt: "Der Angreifer versuchte auszuführen",
    defense: "Das Unternehmen verfügte über",
    blocked: "Diese Technologien haben den Angriff erfolgreich verhindert.",
    compromised: "Die Verteidigung wurde kompromittiert und der Angriff erreichte die geschützte Umgebung.",
    successChance: "Erfolgswahrscheinlichkeit der KI",
    result: "Ergebnis der KI",
    success: "ERFOLG",
    failed: "FEHLGESCHLAGEN",
    threat: "Bedrohungsstufe",
    attacker: "Angreifer",
    target: "Ziel",
    simulation: "KI-SIMULATION",
  },

  intro: {
    company: "GLOBALES CYBER-VERTEIDIGUNGSZENTRUM",
    description:
      "CyberWatch X ist eine interaktive Plattform, die zeigt, wie Cyberangriffe weltweit täglich stattfinden — durch Echtzeitsimulationen.",
    mission: "Unsere Mission",
    missionText:
      "Menschen mithilfe von Künstlicher Intelligenz, 3D-Visualisierung und immersiven Erlebnissen für Informationssicherheit sensibilisieren, schulen und näherbringen.",
    welcome: "Willkommen",
    loadingAI: "Künstliche Intelligenz wird initialisiert...",
    loadingSensors: "Globale Sensoren werden verbunden...",
    loadingSatellites: "Satellitennetzwerk wird verbunden...",
    loadingThreatIntel: "Threat Intelligence wird synchronisiert...",
    loadingCompanies: "Globale Unternehmen werden überwacht...",
    aiOnline: "KI ONLINE",
  },

  academy: {
    title: "Akademie",
    description:
      "CyberWatch X Schulungszentrum für Lernen und Sensibilisierung im Bereich Informationssicherheit.",
    online: "SCHULUNGSSYSTEM ONLINE",
    back: "ZURÜCK",
    start: "MODUL STARTEN",
    completed: "MODUL ABGESCHLOSSEN",
    complete: "MODUL ABSCHLIESSEN",
    progress: "SCHULUNGSFORTSCHRITT",
    simulationNotice:
      "Dieser Inhalt ist Teil einer CyberWatch X Lernsimulation.",
    certificateUnlocked: "ZERTIFIKAT FREIGESCHALTET",
    allModulesCompleted: "Alle Schulungsmodule wurden abgeschlossen.",

    modules: {
      cybersecurity: {
        title: "Einführung in die Cybersicherheit",
        description: "Lernen Sie die Grundlagen der Informationssicherheit und digitaler Bedrohungen kennen.",
        materialTitle: "Grundlagen der Cybersicherheit",
        material: "In diesem Modul lernen Sie die grundlegenden Konzepte der Informationssicherheit, digitale Bedrohungen, Schwachstellen, Risiken und bewährte Schutzmaßnahmen kennen.",
      },
      attacks: {
        title: "Angriffsarten",
        description: "Erfahren Sie, wie Ransomware, Phishing, DDoS und andere Angriffe funktionieren.",
        materialTitle: "Cyberangriffe",
        material: "Erfahren Sie, wie Angriffe wie Phishing, Ransomware, DDoS, Malware und Social Engineering funktionieren.",
      },
      defense: {
        title: "Cyberverteidigung",
        description: "Lernen Sie Technologien zur Erkennung, Blockierung und Reaktion auf Angriffe kennen.",
        materialTitle: "Cyberverteidigung",
        material: "Lernen Sie Firewalls, EDR, Antivirensoftware, Backups, Überwachung und andere Verteidigungstechnologien kennen.",
      },
      artificialIntelligence: {
        title: "Künstliche Intelligenz",
        description: "Verstehen Sie, wie KI bei der Analyse und Erkennung von Vorfällen helfen kann.",
        materialTitle: "KI in der Cybersicherheit",
        material: "Erfahren Sie, wie Künstliche Intelligenz und maschinelles Lernen helfen können, Muster, Bedrohungen und verdächtiges Verhalten zu erkennen.",
      },
      threatIntelligence: {
        title: "Threat Intelligence",
        description: "Erfahren Sie, wie Bedrohungsinformationen die Sicherheit verbessern können.",
        materialTitle: "Threat Intelligence",
        material: "Erfahren Sie, wie Bedrohungsinformationen gesammelt, analysiert und genutzt werden können, um Angriffe vorherzusehen.",
      },
      soc: {
        title: "SOC",
        description: "Lernen Sie die Funktionsweise eines Security Operations Center kennen.",
        materialTitle: "Security Operations Center",
        material: "Lernen Sie die Funktionsweise eines SOC kennen, einschließlich kontinuierlicher Überwachung, Alarmanalyse und Vorfallsreaktion.",
      },
      siem: {
        title: "SIEM",
        description: "Verstehen Sie, wie Sicherheitsereignisse gesammelt, korreliert und analysiert werden.",
        materialTitle: "SIEM",
        material: "Erfahren Sie, wie SIEM-Plattformen Protokolle und Ereignisse zentralisieren, um Vorfälle zu erkennen und zu untersuchen.",
      },
      zeroTrust: {
        title: "Zero Trust",
        description: "Lernen Sie das Konzept kennen, niemals automatisch zu vertrauen und immer zu überprüfen.",
        materialTitle: "Zero-Trust-Architektur",
        material: "Verstehen Sie das Prinzip, Benutzern, Geräten, Anwendungen und Zugriffen niemals automatisch zu vertrauen und immer zu überprüfen.",
      },
    },
  },

  certificate: {
    certifies: "Hiermit wird bestätigt, dass",
    completed: "alle Module der CyberWatch X Academy erfolgreich abgeschlossen hat.",
    emit: "ZERTIFIKAT AUSSTELLEN",
    print: "ZERTIFIKAT DRUCKEN",
  },
};
