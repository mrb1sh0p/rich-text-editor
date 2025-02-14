import React, { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const FindReplaceModal = ({ editorRef, onClose }) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(-1);

  useHotkeys('esc', onClose);

  const findMatches = () => {
    const content = editorRef.current.innerHTML;
    const regex = new RegExp(findText, 'gi');
    const matches = [...content.matchAll(regex)];
    setMatches(matches);
    setCurrentMatch(matches.length > 0 ? 0 : -1);
  };

  const replace = () => {
    if (currentMatch === -1) return;
    
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(editorRef.current.childNodes[0], matches[currentMatch].index);
    range.setEnd(editorRef.current.childNodes[0], matches[currentMatch].index + findText.length);
    selection.removeAllRanges();
    selection.addRange(range);
    
    document.execCommand('insertText', false, replaceText);
    findMatches();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="findReplaceHeading">
      <div className="modal-content">
        <h2 id="findReplaceHeading">Localizar e substituir</h2>
        
        <div className="form-group">
          <label htmlFor="findInput">Localizar:</label>
          <input
            id="findInput"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            onKeyUp={findMatches}
          />
        </div>

        <div className="form-group">
          <label htmlFor="replaceInput">Substituir por:</label>
          <input
            id="replaceInput"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button onClick={findMatches} aria-label="Localizar próximo">
            Localizar ({matches.length})
          </button>
          <button onClick={replace} aria-label="Substituir">
            Substituir
          </button>
          <button onClick={onClose} aria-label="Fechar">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindReplaceModal;