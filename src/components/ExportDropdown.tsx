import React, { useState, useRef, useEffect } from "react";
import { FiDownload, FiX } from "react-icons/fi";

interface ExportDropdownProps {
  onExport: (format: string) => void;
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="export-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FiDownload />
        Exportar
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="menu">
          <div className="menu-header">
            <h4>Exportar como:</h4>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
            >
              <FiX />
            </button>
          </div>

          <div className="menu-items">
            <button
              className="menu-item"
              onClick={() => {
                onExport("html");
                setIsOpen(false);
              }}
              role="menuitem"
            >
              <span>HTML Document</span>
              <small>.html - Formato web</small>
            </button>

            <button
              className="menu-item"
              onClick={() => {
                onExport("md");
                setIsOpen(false);
              }}
              role="menuitem"
            >
              <span>Markdown</span>
              <small>.md - Para documentação</small>
            </button>

            <button
              className="menu-item"
              onClick={() => {
                onExport("txt");
                setIsOpen(false);
              }}
              role="menuitem"
            >
              <span>Texto simples</span>
              <small>.txt - Sem formatação</small>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportDropdown;
