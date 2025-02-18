import "./css/Header.css";
import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import LanguageSwitcher from "./LanguageSwitcher";
import LoginButton from "./LoginButton";

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <LanguageSwitcher />
        <h1>Richly</h1>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Alternar para tema ${darkMode ? "claro" : "escuro"}`}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
      <div className="login-content">
        <div className="login-button">
          <LoginButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
