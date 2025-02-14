import React, { useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const FindReplaceModal = ({ editorRef, onClose }) => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(-1);

  useEffect(() => {
    const input = document.getElementById("findInput");
    input?.focus();
  }, []);

  useHotkeys("esc", onClose);

  const findMatches = () => {
    const matches = [];
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      let pos = 0;
      while ((pos = text.indexOf(findText, pos)) > -1) {
        matches.push({ node, offset: pos });
        pos += findText.length;
      }
    }

    setMatches(matches);
    setCurrentMatch(matches.length > 0 ? 0 : -1);
  };

  const replace = () => {
    if (currentMatch === -1) return;

    const selection = window.getSelection();
    selection.removeAllRanges();

    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    let currentIndex = 0;

    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      const index = text.indexOf(findText);

      if (index > -1 && currentIndex === currentMatch) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + findText.length);
        selection.addRange(range);
        document.execCommand("insertText", false, replaceText);
        findMatches();
        return;
      }
      currentIndex++;
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-labelledby="findReplaceHeading"
    >
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
