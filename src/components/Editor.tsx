import "./css/Editor.css";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiSave } from "react-icons/fi";

import { Note } from "../types/note";
import HistoryPanel from "./HistoryPanel";
import Toolbar from "./Toolbar";
import FindReplaceModal from "./FindReplaceModal";
import TableInsertModal from "./TableInsertModal";
import { sanitizeHTML } from "../utils/sanitize";

interface HistoryState {
  stack: string[];
  pointer: number;
}

interface EditorProps {
  note?: Note | null;
  onSave: (content: string) => void;
}

const Editor = ({ note, onSave }: EditorProps) => {
  const { t } = useTranslation("editor");
  const [showHistory, setShowHistory] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showTableInsert, setShowTableInsert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<HistoryState>({
    stack: [""],
    pointer: 0,
  });

  const handleRestore = (content: string) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
      onSave(content);
      setShowHistory(false);
    }
  };

  const handleEditorInput = useCallback(() => {
    if (!editorRef.current) return;

    const rawContent = editorRef.current.innerHTML;
    const content = sanitizeHTML(rawContent).toString();

    setHistory((prev) => ({
      stack: [...prev.stack.slice(0, prev.pointer + 1), content],
      pointer: prev.pointer + 1,
    }));

    // Atualização imediata do estado pai
    onSave(content);
  }, [onSave]);

  useEffect(() => {
    const handleInput = () => {
      setIsSaving(true);
      handleEditorInput();
      setTimeout(() => setIsSaving(false), 500); // Simula feedback visual
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", handleInput);
      return () => editor.removeEventListener("input", handleInput);
    }
  }, [handleEditorInput]);

  // Carregar conteúdo da nota
  useEffect(() => {
    if (!editorRef.current || !note) return;

    const loadContent = () => {
      editorRef.current!.innerHTML = note.content;
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current!);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    };

    if (editorRef.current.innerHTML !== note.content) {
      loadContent();
    }
  }, [note]);

  return (
    <div className="editor-container">
      <Toolbar
        history={history}
        setHistory={setHistory}
        editorRef={editorRef}
        setShowFindReplace={() => setShowFindReplace(true)}
        setShowTableInsert={() => setShowTableInsert(true)}
        setShowHistory={async () => setShowHistory(!showHistory)}
      />

      {showFindReplace && (
        <FindReplaceModal
          editorRef={editorRef}
          onClose={() => setShowFindReplace(false)}
        />
      )}

      {showTableInsert && (
        <TableInsertModal
          editorRef={editorRef}
          onClose={() => setShowTableInsert(false)}
        />
      )}

      {showHistory && note && (
        <HistoryPanel history={note.history} onRestore={handleRestore} />
      )}

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable={!!note}
        suppressContentEditableWarning
        onInput={handleEditorInput}
      />

      <div className="status-bar">
        <span
          className={
            isSaving ? "saving-indicator" : "saved-indicator saving-indicator"
          }
        >
          <FiSave className={isSaving ? "spin-icon" : ""} />
          {isSaving ? t("editor.saving") + "..." : t("editor.saved")}
        </span>
      </div>
    </div>
  );
};

export default Editor;
