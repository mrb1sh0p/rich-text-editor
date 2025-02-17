import "./Editor.css";
import { useRef, useCallback } from "react";
import ExportDropdown from "./ExportDropdown";
import { useError } from "../contexts/ErrorContext";
import { sanitizeHTML } from "../utils/sanitize";

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

interface HistoryState {
  stack: string[];
  pointer: number;
}

interface ToolbarProps {
  setHistory: React.Dispatch<React.SetStateAction<HistoryState>>;
  history: HistoryState;
  saveState: () => void;
  setShowFindReplace: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTableInsert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Toolbar({
  saveState,
  setHistory,
  setShowFindReplace,
  setShowTableInsert,
  history,
}: ToolbarProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const { handleError } = useError();

  const handleCommand = useCallback(
    (command: string, value?: string | null) => {
      try {
        document.execCommand(command, false, value ?? undefined);
        saveState();
      } catch (error) {
        handleError(error as Error);
      }
    },
    [saveState, handleError]
  );

  const handleUndo = () => {
    setHistory((prev) => ({
      ...prev,
      pointer: prev.pointer - 1,
    }));
    if (!editorRef.current) return;
    editorRef.current.innerHTML = history.stack[history.pointer - 1];
  };

  const handleRedo = () => {
    setHistory((prev) => ({
      ...prev,
      pointer: prev.pointer + 1,
    }));
    if (!editorRef.current) return;
    editorRef.current.innerHTML = history.stack[history.pointer + 1];
  };

  const handleExport = (format: any) => {
    console.log("html");
    try {
      if (!editorRef.current) return;
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
      if (error instanceof Error) {
        handleError(new Error("Erro na exportação: " + error.message));
      } else {
        handleError(new Error("Erro na exportação"));
      }
    }
  };

  return (
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
      <div style={{ marginLeft: "auto" }}>
        <ExportDropdown onExport={handleExport} />
      </div>
    </div>
  );
}
