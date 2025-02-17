import "./Editor.css";
import React, { useState, useRef, useCallback, useEffect } from "react";

import { useDebouncedSave } from "../hooks/useDebouncedSave";

import { FiSave } from "react-icons/fi";
import Toolbar from "./Toolbar";
import FindReplaceModal from "./FindReplaceModal";
import TableInsertModal from "./TableInsertModal";
import { sanitizeHTML } from "../utils/sanitize";

interface HistoryState {
  stack: string[];
  pointer: number;
}

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
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
  }, [isSaving]);

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
            <FiSave className="spin-icon" /> Salvando...
          </span>
        ) : (
          <span className="saved-indicator">
            <FiSave /> Todas as alterações foram salvas
          </span>
        )}
      </div>
    </div>
  );
}
