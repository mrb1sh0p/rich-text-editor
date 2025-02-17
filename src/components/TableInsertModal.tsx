import "./Modal.css";
import React, { useState } from "react";
import { sanitizeHTML } from "../utils/sanitize";
import { useTranslation } from "react-i18next";

interface TableInsertModalProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

const TableInsertModal: React.FC<TableInsertModalProps> = ({
  editorRef,
  onClose,
}) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [header, setHeader] = useState(false);
  const { t } = useTranslation("editor");

  const insertTable = () => {
    const cleanHTML = sanitizeHTML(`
        <table role="grid">
      ${
        header
          ? `<thead><tr>${Array(cols)
              .fill('<th scope="col">Header</th>')
              .join("")}</tr></thead>`
          : ""
      }
      <tbody>
        ${Array(rows)
          .fill(undefined)
          .map(() => `<tr>${Array(cols).fill("<td><br></td>").join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
    `);

    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("insertHTML", false, cleanHTML);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-labelledby="tableInsertHeading"
    >
      <div className="modal-content">
        <h2 id="tableInsertHeading">{t("table.insertTable")}</h2>

        <div className="form-group">
          <label htmlFor="rowsInput">{t("table.lines")}:</label>
          <input
            id="rowsInput"
            type="number"
            min="1"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="colsInput">{t("table.columns")}:</label>
          <input
            id="colsInput"
            type="number"
            min="1"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              id="checkInput"
              type="checkbox"
              checked={header}
              onChange={(e) => setHeader(e.target.checked)}
            />{" "}
            {t("table.header")}
          </label>
        </div>

        <div className="button-group">
          <button id="insert" onClick={insertTable}>
            {t("table.insert")}
          </button>
          <button id="cancel" onClick={onClose}>
            {t("table.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableInsertModal;
