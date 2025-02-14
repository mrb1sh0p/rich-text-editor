import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Text Editor Pro</h1>
        <button 
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Alternar para tema ${darkMode ? 'claro' : 'escuro'}`}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;