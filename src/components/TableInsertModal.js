import React, { useState } from 'react';

const TableInsertModal = ({ editorRef, onClose }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [header, setHeader] = useState(true);

  const insertTable = () => {
    const tableHTML = `
      <table role="grid">
        ${header ? `<thead><tr>${Array(cols).fill('<th scope="col">Header</th>').join('')}</tr></thead>` : ''}
        <tbody>
          ${Array(rows).fill(
            `<tr>${Array(cols).fill('<td>Content</td>').join('')}</tr>`
          ).join('')}
        </tbody>
      </table>
    `;
    
    document.execCommand('insertHTML', false, tableHTML);
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="tableInsertHeading">
      <div className="modal-content">
        <h2 id="tableInsertHeading">Inserir tabela</h2>
        
        <div className="form-group">
          <label htmlFor="rowsInput">Linhas:</label>
          <input
            id="rowsInput"
            type="number"
            min="1"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="colsInput">Colunas:</label>
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
              type="checkbox"
              checked={header}
              onChange={(e) => setHeader(e.target.checked)}
            />
            Cabeçalho
          </label>
        </div>

        <div className="button-group">
          <button onClick={insertTable}>Inserir</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default TableInsertModal;