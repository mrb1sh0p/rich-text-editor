import React from "react";
import "./Editor.css";

export default function Editor() {
  return (
    <div className="editor-container">
      <div
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
      ></div>
    </div>
  );
}
