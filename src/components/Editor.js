import React from "react";
import "./Editor.css";

export default function Editor() {
  const editorRef = React.useRef(null); 

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
      <div className="toolbar">
        <button onClick={() => document.execCommand("bold")}>B</button>
        <button onClick={() => document.execCommand("italic")}>I</button>
        <button onClick={() => document.execCommand("underline")}>U</button>

        <select onChange={(e) => handleCommand('formatBlock', e.target.value)}>
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
        </select>
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
