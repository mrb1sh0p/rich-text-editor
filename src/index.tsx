import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import i18n from "./i18n/config"

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ErrorProvider>
            <App />
          </ErrorProvider>
        </AuthProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
