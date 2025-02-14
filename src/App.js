import axios from "axios";
import React, { useState, useEffect } from "react";
import { ErrorProvider } from "./contexts/ErrorContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Editor from "./components/Editor";
import "./theme.css";
import "./App.css";

function App() {
  const mockServiceUrl = "https://mockerrorapi.com/log";
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
    const flushErrors = async () => {
      const errors = JSON.parse(localStorage.getItem("errorQueue") || "[]");
      if (errors.length > 0) {
        await Promise.all(errors.map((e) => axios.post(mockServiceUrl, e)));
        localStorage.removeItem("errorQueue");
      }
    };
    window.addEventListener("online", flushErrors);
    return () => window.removeEventListener("online", flushErrors);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ErrorProvider>
      <div className="App">
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Editor />
        <Footer />
      </div>
    </ErrorProvider>
  );
}

export default App;
