import "./Editor.css";
import React, { useEffect, useContext, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import ExportDropdown from "./ExportDropdown";
import { ErrorContext } from "../contexts/ErrorContext";
import { sanitizeHTML } from "../utils/sanitize";
import TableInsertModal from "./TableInsertModal";
// import ImageUpload from "./ImageUpload";
import FindReplaceModal from "./FindReplaceModal";

import {
  exportAsHTML,
  exportAsText,
  exportAsMarkdown,
} from "../utils/exporters";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaLink,
  FaImage,
  FaSearch,
  FaTable,
} from "react-icons/fa";

export default function Editor() {
  const editorRef = React.useRef(null);
  const { handleError } = useContext(ErrorContext);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showTableInsert, setShowTableInsert] = useState(false);

  useHotkeys("ctrl+shift+f, ctrl+shift+f", (e) => {
    e.preventDefault();
    setShowFindReplace(true);
  });

  useHotkeys("ctrl+shift+t, ctrl+shift+t", (e) => {
    e.preventDefault();
    setShowTableInsert(true);
  });

  useEffect(() => {
    const saved = localStorage.getItem("editorContent");
    if (saved) editorRef.current.innerHTML = saved;
  }, []);

  const [history, setHistory] = React.useState({
    stack: [""],
    pointer: 0,
  });

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    saveState();
  };
  const handleUndo = () => {
    setHistory((prev) => ({
      ...prev,
      pointer: prev.pointer - 1,
    }));
    editorRef.current.innerHTML = history.stack[history.pointer - 1];
  };

  const handleRedo = () => {
    setHistory((prev) => ({
      ...prev,
      pointer: prev.pointer + 1,
    }));
    editorRef.current.innerHTML = history.stack[history.pointer + 1];
  };

  const saveState = () => {
    const rawContent = editorRef.current.innerHTML;
    const content = sanitizeHTML(rawContent);
    setHistory((prev) => ({
      stack: [...prev.stack.slice(0, prev.pointer + 1), content],
      pointer: prev.pointer + 1,
    }));
    localStorage.setItem("editorContent", content);
  };

  const handleExport = (format) => {
    console.log("html");
    try {
      const content = sanitizeHTML(editorRef.current.innerHTML);
      let exported = "";

      switch (format) {
        case "html":
          console.log("html");
          exported = exportAsHTML(content);
          break;
        case "md":
          console.log("md");
          exported = exportAsMarkdown(content);
          break;
        case "txt":
          console.log("txt");
          exported = exportAsText(content);
          break;
        default:
          throw new Error("Formato de exportação inválido");
      }

      const blob = new Blob([exported], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `document.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      handleError(new Error("Erro na exportação: " + error.message));
    }
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button
          onClick={() => setShowFindReplace(true)}
          aria-label="Localizar e substituir"
        >
          <FaSearch />
        </button>
        <button
          onClick={() => handleCommand("bold")}
          aria-label="Negrito"
          role="switch"
          aria-checked={document.queryCommandState("bold")}
        >
          <FaBold />
        </button>

        <button
          onClick={() => handleCommand("italic")}
          aria-label="Itálico"
          role="switch"
          aria-checked={document.queryCommandState("italic")}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => handleCommand("underline")}
          aria-label="Sublinhado"
          role="switch"
          aria-checked={document.queryCommandState("underline")}
        >
          <FaUnderline />
        </button>
        {/* <ImageUpload onSuccess={(url) => handleCommand("insertImage", url)} /> */}

        <button
          onClick={() => setShowTableInsert(true)}
          aria-label="Inserir tabela"
        >
          <FaTable />
        </button>

        <select
          aria-label="Formatar bloco"
          onChange={(e) => handleCommand("formatBlock", e.target.value)}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <button onClick={() => handleUndo()} disabled={history.pointer === 0}>
          <FaUndo />
        </button>

        <button
          onClick={() => handleRedo()}
          disabled={history.pointer === history.stack.length - 1}
        >
          <FaRedo />
        </button>

        <button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) handleCommand("createLink", url);
          }}
        >
          <FaLink />
        </button>

        <button
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) handleCommand("insertImage", url);
          }}
        >
          <FaImage />
        </button>
        <div style={{marginLeft: "auto"}}>
          <ExportDropdown onExport={handleExport} />
        </div>
      </div>
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
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        onInput={saveState}
      ></div>
    </div>
  );
}
