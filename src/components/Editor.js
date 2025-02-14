import React from "react";
import "./Editor.css";

export default function Editor() {
  const editorRef = React.useRef(null); // Create a reference to the contentEditable div

  // Create a state to store the history of the editor
  const [history, setHistory] = React.useState({
    stack: [""],
    pointer: 0,
  });

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    saveState();
  };

  const saveState = () => {
    const content = editorRef.current.innerHTML;
    setHistory((prev) => ({
      stack: [...prev.stack.slice(0, prev.pointer + 1), content],
      pointer: prev.pointer + 1,
    }));
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => document.execCommand("bold")}>B</button>
        <button onClick={() => document.execCommand("italic")}>I</button>
        <button onClick={() => document.execCommand("underline")}>U</button>
      </div>

      {/* Editor */}
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
