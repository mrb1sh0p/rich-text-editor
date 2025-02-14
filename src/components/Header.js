import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Text Editor</h1>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Alternar para tema ${darkMode ? "light" : "dark"}`}
        >
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
