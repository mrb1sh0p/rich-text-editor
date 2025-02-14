import React, { useEffect, useContext, useState } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import { sanitizeHTML } from "../utils/sanitize";
import TableInsertModal from "./TableInsertModal";
// import ImageUpload from "./ImageUpload";
import FindReplaceModal from "./FindReplaceModal";

import "./Editor.css";

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
    const content = editorRef.current.innerHTML;
    let exported;

    switch (format) {
      case "html":
        exported = exportAsHTML(content);
        break;
      case "md":
        exported = exportAsMarkdown(content);
        break;
      case "txt":
        exported = exportAsText(content);
        break;
      default:
        handleError(new Error("Falha no envio da imagem..."));
    }

    navigator.clipboard.writeText(exported);
    alert("Conteúdo copiado para a área de transferência!");
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
        <select>
          <option>Exportar como...</option>
          <option value="html" onClick={() => handleExport("html")}>
            HTML
          </option>
          <option value="md" onClick={() => handleExport("markdown")}>
            Markdown
          </option>
          <option value="txt" onClick={() => handleExport("text")}>
            Text
          </option>
        </select>
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
