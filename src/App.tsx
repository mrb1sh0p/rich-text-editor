import "./theme.css";
import "./App.css";
import { useState, useEffect, Suspense } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n/config";
import { ErrorProvider } from "./contexts/ErrorContext";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading translations...</div>}>
        <ErrorProvider>
          <div className="App">
            <Header darkMode={darkMode} toggleTheme={toggleTheme} />
            <main className="main-content">
              <Editor />
            </main>
            <Footer />
          </div>
        </ErrorProvider>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
