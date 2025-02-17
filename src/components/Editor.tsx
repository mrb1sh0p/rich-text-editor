import "./css/Editor.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { useDebouncedSave } from "../hooks/useDebouncedSave";
import Toolbar from "./Toolbar";
import FindReplaceModal from "./FindReplaceModal";
import TableInsertModal from "./TableInsertModal";
import { sanitizeHTML } from "../utils/sanitize";

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
}

export default function Editor({ note }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null!);
  const { t } = useTranslation("editor");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showTableInsert, setShowTableInsert] = useState(false);
  const [, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<HistoryState>({
    stack: [""],
    pointer: 0,
  });

  const saveToBackend = useCallback(async (content: any) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay
    localStorage.setItem("editorContent", content.toString());
    setIsSaving(false);
  }, []);
  const debouncedSave = useDebouncedSave(saveToBackend, 500);

  const saveState = () => {
    if (!editorRef.current) return;
    const rawContent = editorRef.current.innerHTML;
    const content = sanitizeHTML(rawContent);

    setHistory((prev) => ({
      stack: [
        ...prev.stack.slice(0, prev.pointer + 1),
        content as unknown as string,
      ],
      pointer: prev.pointer + 1,
    }));
    localStorage.setItem("editorContent", content.toString());
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = (e.target as HTMLDivElement).innerHTML;
    setContent(newContent);
    debouncedSave(newContent);
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
      if (!editorRef.current) return;
      editorRef.current.innerHTML = savedContent;
    }

    if (note && editorRef.current) {
      editorRef.current.innerHTML = note.content;
    }

    const handleBeforeUnload = (e: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      if (isSaving) {
        e.preventDefault();
        e.returnValue = "Você tem alterações não salvas!";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  return (
    <div className="editor-container">
      <Toolbar
        setHistory={setHistory}
        history={history}
        saveState={saveState}
        setShowFindReplace={setShowFindReplace}
        setShowTableInsert={setShowTableInsert}
      />
      {showFindReplace && (
        <FindReplaceModal
          editorRef={editorRef}
          onClose={() => setShowFindReplace(false)}
          saveState={saveState}
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
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
      ></div>
      <div className="status-bar">
        {isSaving ? (
          <span className="saving-indicator">
            <FiSave className="spin-icon" /> {t("editor.salving")}...
          </span>
        ) : (
          <span className="saved-indicator">
            <FiSave /> {t("editor.salve")}
          </span>
        )}
      </div>
    </div>
  );
}
