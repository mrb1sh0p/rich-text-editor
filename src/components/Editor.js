import React from "react";
import "./Editor.css";

export default function Editor() {
  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={ () => document.execCommand("bold") }>B</button>
        <button onClick={ () => document.execCommand("italic") }>I</button>
        <button onClick={ () => document.execCommand("underline")}>U</button>
      </div>

      <div
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
      ></div>
    </div>
  );
}
