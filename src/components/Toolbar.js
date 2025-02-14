import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaLink,
  FaImage,
} from "react-icons/fa";

export default function Toolbar(editor) {
  return (
    <div className="toolbar" role="toolbar" aria-label="Editor toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        aria-pressed={editor.isActive("bold")}
        aria-label="Negrito"
      >
        <FaBold />
      </button>
      {/* Adicione outros botões seguindo o mesmo padrão */}
    </div>
  );
}
