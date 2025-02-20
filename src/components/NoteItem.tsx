import { Note } from "../types/note";
import { FiSave, FiTrash2 } from "react-icons/fi";

interface NoteItemProps {
  note: Note;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSaveEdit: (newTitle: string) => void;
  editing: boolean;
  editedTitle: string;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  isActive,
  onSelect,
  onDelete,
  onStartEdit,
  onSaveEdit,
  editing,
  editedTitle,
}) => {
  return (
    <div
      className={`note-item ${isActive ? "active" : ""}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Select note ${note.title}`}
    >
      <div className="note-header">
        {editing ? (
          <div className="edit-title-container">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => onSaveEdit(e.target.value)} // Atualiza o estado local
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSaveEdit(editedTitle); // Salva ao pressionar Enter
                } else if (e.key === "Escape") {
                  onSaveEdit(note.title); // Cancela ao pressionar Escape
                }
              }}
              onBlur={() => onSaveEdit(editedTitle)} // Salva ao perder o foco
              autoFocus
              aria-label="Edit note title"
            />
            <button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSaveEdit(editedTitle);
              }}
              aria-label="Save title"
            >
              <FiSave />
            </button>
          </div>
        ) : (
          <div className="note-title-wrapper">
            <h4 onDoubleClick={onStartEdit} aria-label={note.title}>
              {note.title}
            </h4>
            <button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label={`Delete note ${note.title}`}
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>

      {!editing && (
        <small className="note-date">
          {new Date(note.updatedAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </small>
      )}
    </div>
  );
};

export default NoteItem;
