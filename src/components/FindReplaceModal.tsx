import React, { useState, useRef, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";
import { useHotkeys } from "react-hotkeys-hook";

interface FindReplaceModalProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

const FindReplaceModal: React.FC<FindReplaceModalProps> = ({
  editorRef,
  onClose,
}) => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matches, setMatches] = useState<{ node: Node; offset: number }[]>([]);
  const [, setCurrentMatch] = useState(-1);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useHotkeys("esc", onClose);

  const findMatches = () => {
    const matches = [];
    if (!editorRef.current) return;
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      if (text === null) continue;
      let pos = 0;
      while ((pos = text.indexOf(findText, pos)) > -1) {
        matches.push({ node, offset: pos });
        pos += findText.length;
      }
    }

    setMatches(matches);
    setCurrentMatch(matches.length > 0 ? 0 : -1);
  };

  const replaceAll = () => {
    if (!findText) return;
    if (!editorRef.current) return;

    let content = editorRef.current.innerHTML;
    const regex = new RegExp(findText, "gi");
    const newContent = content.replace(regex, replaceText);

    editorRef.current.innerHTML = newContent;
    setMatches([]);
    setCurrentMatch(-1);
  };

  return (
    <FocusTrap>
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
            <button
              onClick={replaceAll}
              aria-label="Substituir todas"
              disabled={!findText}
            >
              Substituir ({matches.length})
            </button>
            <button onClick={onClose} aria-label="Fechar">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default FindReplaceModal;