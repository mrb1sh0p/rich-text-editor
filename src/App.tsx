import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { useAuth } from "./contexts/AuthContext";
import {
  createNote,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService,
} from "./services/notesService";
import "./theme.css";
import "./App.css";
import "./components/css/LoginButton.css";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

const App = () => {
  const { t } = useTranslation("common");
  const { user } = useAuth();

  // Theme state and initialization
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Notes state management
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        if (user) {
          // Load from server
          const response = await fetch(`/api/notes?user=${user.email}`);
          const serverNotes = await response.json();
          setNotes(serverNotes);
        } else {
          // Load from localStorage
          const localNotes = localStorage.getItem("notes");
          setNotes(localNotes ? JSON.parse(localNotes) : []);
          const lastNoteId = localStorage.getItem("lastNoteId");
          setCurrentNoteId(lastNoteId);
        }
      } catch (error) {
        console.error("Failed to load notes:", error);
      }
    };

    loadNotes();
  }, [user]);

  // Sync local storage when not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("notes", JSON.stringify(notes));
      currentNoteId
        ? localStorage.setItem("lastNoteId", currentNoteId)
        : localStorage.removeItem("lastNoteId");
    }
  }, [notes, currentNoteId, user]);

  // Note operations
  const createNewNote = useCallback(async () => {
    if (!user) return;

    try {
      const newNote = {
        title: t("sidebar.untitled"),
        content: "",
        updatedAt: new Date(),
      };

      const createdNote = await createNote(user!.email || "", newNote);
      setNotes((prev) => [{ id: createdNote.id, ...newNote }, ...prev]);
      setCurrentNoteId(createdNote.id);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  }, [t, user]);

  const updateNote = useCallback(
    async (noteId: string, updates: Partial<Note>) => {
      try {
        const safeUpdates = {
          ...updates,
          content: updates.content?.toString() || "",
        };

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId
              ? { ...note, ...safeUpdates, updatedAt: new Date() }
              : note
          )
        );

        if (user) {
          await updateNoteService(user.email || "", noteId, safeUpdates);
        }
      } catch (error) {
        console.error("Failed to update note:", error);
      }
    },
    [user]
  );

  const deleteNote = useCallback(
    async (noteId: string) => {
      try {
        setNotes((prev) => prev.filter((n) => n.id !== noteId));

        if (user) {
          await deleteNoteService(user!.email || "", noteId);
        }

        if (noteId === currentNoteId) {
          setCurrentNoteId(notes[0]?.id || null);
        }
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    },
    [currentNoteId, user, notes]
  );

  const currentNote = notes.find((note) => note.id === currentNoteId) || null;

  return (
    <div className="app-container">
      <Header darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      {user ? (
        <main className="main-content">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            onCreateNote={createNewNote}
            onSelectNote={(note) => setCurrentNoteId(note.id)}
            onUpdateNote={(id, title) => updateNote(id, { title })}
            onDeleteNote={deleteNote}
          />

          <div className="editor-wrapper">
            {currentNote ? (
              <Editor
                key={currentNote.id}
                note={currentNote}
                onSave={(content) => updateNote(currentNote.id, { content })}
              />
            ) : (
              <div className="empty-state">
                <h2>{t("empty_state.title")}</h2>
                <p>{t("empty_state.message")}</p>
              </div>
            )}
          </div>
        </main>
      ) : (
        <div className="empty-state">
          <h2>{t("empty_user.title")}</h2>
          <p>{t("empty_user.message")}</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
