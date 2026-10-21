import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";
import { LanguageProvider } from "./context/LanguageContext";
import { purgeLegacyData } from "./services/userStore";

// Drop data saved by older versions (plain-text e-mail, shared progress).
purgeLegacyData();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
