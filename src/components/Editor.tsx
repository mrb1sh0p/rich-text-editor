import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiSave } from "react-icons/fi";
import { useDebouncedSave } from "../hooks/useDebouncedSave";
import Toolbar from "./Toolbar";
import FindReplaceModal from "./FindReplaceModal";
import TableInsertModal from "./TableInsertModal";
import { sanitizeHTML } from "../utils/sanitize";
import "./css/Editor.css";

interface HistoryState {
  stack: string[];
  pointer: number;
}

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

interface EditorProps {
  note?: Note | null;
  onSave: (content: string) => void;
}

const Editor = ({ note, onSave }: EditorProps) => {
  const { t } = useTranslation("editor");
  const editorRef = useRef<HTMLDivElement>(document.createElement("div"));
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showTableInsert, setShowTableInsert] = useState(false);
  const [isSaving] = useState(false);
  const [history, setHistory] = useState<HistoryState>({
    stack: [""],
    pointer: 0,
  });

  const handleEditorInput = useCallback(() => {
    if (!editorRef.current) return;

    const rawContent = editorRef.current.innerHTML;
    const content = sanitizeHTML(rawContent);

    // Atualizar histórico
    setHistory((prev) => ({
      stack: [...prev.stack.slice(0, prev.pointer + 1), content],
      pointer: prev.pointer + 1,
    }));

    // Disparar salvamento
    onSave(content);
  }, [onSave]);

  const debouncedSave = useDebouncedSave(handleEditorInput, 500);

  // Carregar conteúdo da nota
  useEffect(() => {
    if (!editorRef.current) return;

    // Resetar conteúdo
    editorRef.current.innerHTML = "";

    if (note?.content) {
      // Carregar conteúdo após renderização
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = note.content;

          // Posicionar cursor no final
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id]); // Recarregar apenas quando o ID mudar

  // Gerenciar salvamento automático
  useEffect(() => {
    const handleInput = () => {
      if (editorRef.current) {
        debouncedSave(editorRef.current.innerHTML);
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", handleInput);
      return () => editor.removeEventListener("input", handleInput);
    }
  }, [debouncedSave]);

  // Prevenção de perda de dados
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSaving) {
        e.preventDefault();
        e.returnValue = t("unsaved_changes_warning");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaving, t]);

  return (
    <div className="editor-container">
      <Toolbar
        history={history}
        setHistory={setHistory}
        editorRef={editorRef}
        setShowFindReplace={() => setShowFindReplace(true)}
        setShowTableInsert={() => setShowTableInsert(true)}
      />

      {showFindReplace && editorRef.current && (
        <FindReplaceModal
          editorRef={editorRef as React.RefObject<HTMLDivElement>}
          onClose={() => setShowFindReplace(false)}
        />
      )}

      {showTableInsert && (
        <TableInsertModal
          editorRef={editorRef}
          onClose={() => setShowTableInsert(false)}
        />
      )}

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable={!!note}
        suppressContentEditableWarning
      />

      <div className="status-bar">
        {isSaving ? (
          <span className="saving-indicator">
            <FiSave className="spin-icon" /> {t("saving")}...
          </span>
        ) : (
          <span className="saved-indicator">
            <FiSave /> {t("saved")}
          </span>
        )}
      </div>
    </div>
  );
};

export default Editor;