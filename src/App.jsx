import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CyberExperience from "./components/Intro/CyberExperience";
import MatrixEntry from "./components/Intro/MatrixEntry";
import Academy from "./pages/Academy/Academy";
import ModulePage from "./pages/Academy/ModulePage";
import Certificate from "./pages/Academy/Certificate";
import CertificateVerification from "./pages/CertificateVerification";
import { issueCertificate, saveCompletedModule } from "./services/userStore";

import "./styles/global.css";

function initialScreen() {
  const hash = window.location.hash.replace(/^#/, "");
  return new URLSearchParams(hash).has("verify") ? "verify" : "intro";
}

function App() {
  const [screen, setScreen] = useState(initialScreen);
  const [verifyReturn, setVerifyReturn] = useState("intro");

  // Signed-in student: { id, name }. The e-mail is never kept in memory.
  const [user, setUser] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [certificate, setCertificate] = useState(null);

  function handleLogin(student) {
    setUser({ id: student.id, name: student.name });
    setCompletedModules(student.completedModules);
    setSelectedModule(null);
    setCertificate(null);
    setScreen("dashboard");
  }

  function handleLogout() {
    setUser(null);
    setCompletedModules([]);
    setSelectedModule(null);
    setCertificate(null);
    setScreen("login");
  }

  function handleCompleteModule(moduleId) {
    if (!user) return;
    setCompletedModules(saveCompletedModule(user.id, moduleId));
  }

  function handleOpenCertificate() {
    if (!user) return;

    const result = issueCertificate(user.id);

    if (result.ok) {
      setCertificate(result.certificate);
      setScreen("certificate");
    }
  }

  function openVerification(returnTo) {
    setVerifyReturn(returnTo);
    setScreen("verify");
  }

  if (screen === "verify") {
    return (
      <CertificateVerification
        onBack={() => {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
          setScreen(user ? verifyReturn : "intro");
        }}
      />
    );
  }

  if (screen === "intro") {
    return (
      <CyberExperience
        onComplete={() => setScreen("matrix")}
        onExit={() => setScreen("login")}
      />
    );
  }

  if (screen === "matrix") {
    return <MatrixEntry onComplete={() => setScreen("login")} />;
  }

  // Everything below requires a signed-in student.
  if (!user) {
    return <Login onLogin={handleLogin} onExit={() => setScreen("intro")} />;
  }

  if (screen === "academy") {
    return (
      <Academy
        userName={user.name}
        completedModules={completedModules}
        onModuleSelect={(module) => {
          setSelectedModule(module);
          setScreen("module");
        }}
        onCertificate={handleOpenCertificate}
        onExit={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "module" && selectedModule) {
    return (
      <ModulePage
        module={selectedModule}
        alreadyCompleted={completedModules.includes(Number(selectedModule.id))}
        onComplete={handleCompleteModule}
        onBack={() => {
          setSelectedModule(null);
          setScreen("academy");
        }}
      />
    );
  }

  if (screen === "certificate" && certificate) {
    return (
      <Certificate
        certificate={certificate}
        onBack={() => setScreen("academy")}
        onValidate={() => openVerification("certificate")}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      onAcademy={() => setScreen("academy")}
      onExit={handleLogout}
    />
  );
}

export default App;
