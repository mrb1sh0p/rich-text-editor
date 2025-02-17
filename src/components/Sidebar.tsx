import "./css/Sidebar.css"
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import SearchBar from "./SearchBar";


interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

const Sidebar: React.FC<{
  onSelectNote: (note: Note) => void;
  currentNote?: Note | null;
}> = ({ onSelectNote, currentNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation("common");
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: t("sidebar.untitled"),
      content: "",
      updatedAt: new Date(),
    };

    setNotes((prev) => {
      const updated = [newNote, ...prev];
      localStorage.setItem("notes", JSON.stringify(updated));
      return updated;
    });

    onSelectNote(newNote);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem("notes", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${
              note.id === currentNote?.id ? "active" : ""
            }`}
            onClick={() => onSelectNote(note)}
          >
            <h4>{note.title}</h4>
            <small>{new Date(note.updatedAt).toLocaleDateString()}</small>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
              className="delete-btn"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>

      <button onClick={createNewNote} className="new-note-btn">
        {t("sidebar.new_note")}
      </button>
    </div>
  );
};

export default Sidebar;
