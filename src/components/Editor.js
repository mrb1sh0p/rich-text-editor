import React, { useEffect } from "react";
import { sanitizeHTML } from "../utils/sanitize";
import ImageUpload from "./ImageUpload";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaLink,
  FaImage,
} from "react-icons/fa";

import "./Editor.css";

export default function Editor() {
  const editorRef = React.useRef(null);

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
    const content = sanitizeHTML(editorRef.current.innerHTML);
    setHistory((prev) => ({
      stack: [...prev.stack.slice(0, prev.pointer + 1), content],
      pointer: prev.pointer + 1,
    }));
    localStorage.setItem("editorContent", content);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => document.execCommand("bold")}>
          <FaBold />
        </button>
        <button onClick={() => document.execCommand("italic")}>
          <FaItalic />
        </button>
        <button onClick={() => document.execCommand("underline")}>
          <FaUnderline />
        </button>
        <ImageUpload onSuccess={(url) => handleCommand("insertImage", url)} />

        <select onChange={(e) => handleCommand("formatBlock", e.target.value)}>
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
      </div>

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
