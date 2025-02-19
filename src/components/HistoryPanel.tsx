import "./css/HistoryPanel.css";
import React from "react";
import { NoteHistoryEntry } from "../types/note";
import { useTranslation } from "react-i18next";

interface HistoryPanelProps {
  history: NoteHistoryEntry[];
  onRestore: (content: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore }) => {
  const { t } = useTranslation("common");

  return (
    <div className="history-panel">
      <h3>{t("history.title")}</h3>
      <div className="history-list">
        {history.map((entry, index) => (
          <div key={index} className="history-item">
            <div className="history-header">
              <span className="history-time">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
              <button
                onClick={() => onRestore(entry.content)}
                className="restore-btn"
              >
                {t("history.restore")}
              </button>
            </div>
            <div className="history-preview">
              {entry.content.substring(0, 100)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
