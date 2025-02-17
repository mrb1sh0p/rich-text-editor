import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import SearchBar from "./SearchBar";
import "./css/Sidebar.css";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

interface SidebarProps {
  notes: Note[];
  currentNote: Note | null;
  onSelectNote: (note: Note) => void; 
  onCreateNote: () => void;
  onUpdateNote: (id: string, newTitle: string) => void;
  onDeleteNote: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  currentNote,
  onSelectNote,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const { t } = useTranslation("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartEditing = (note: Note) => {
    setEditingNoteId(note.id);
    setEditedTitle(note.title);
  };

  const handleSaveTitle = (id: string) => {
    if (editedTitle.trim()) {
      onUpdateNote(id, editedTitle.trim());
    }
    setEditingNoteId(null);
    setEditedTitle("");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{t("sidebar.title")}</h3>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <button onClick={onCreateNote} className="new-note-btn">
        {t("sidebar.new_note")}
      </button>

      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${
              note.id === currentNote?.id ? "active" : ""
            }`}
            onClick={() => onSelectNote(note)}
          >
            <div className="note-header">
              {editingNoteId === note.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => handleSaveTitle(note.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSaveTitle(note.id)
                  }
                  autoFocus
                />
              ) : (
                <h4 onDoubleClick={() => handleStartEditing(note)}>
                  {note.title}
                </h4>
              )}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
              >
                <FiX />
              </button>
            </div>
            <small>
              {new Date(note.updatedAt).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
