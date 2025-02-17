import { useState, useEffect } from "react";
import { ErrorProvider } from "./contexts/ErrorContext";
import Editor from "./components/Editor";
import Header from "./components/Header";
import "./theme.css";
import "./App.css";

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
    <ErrorProvider>
      <div className="App">
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Editor />
        </main>
        {/* <Footer /> */}
      </div>
    </ErrorProvider>
  );
}

export default App;
