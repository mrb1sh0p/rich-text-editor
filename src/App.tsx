import { useState, useEffect, useCallback, Suspense } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { ErrorProvider } from "./contexts/ErrorContext";
import i18n from "./i18n/config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import "./theme.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

const App = () => {
  const { t } = useTranslation("common");

  // Estado do tema
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Estado das notas
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Nota atual selecionada
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(() => {
    return localStorage.getItem("lastNoteId");
  });

  // Atualizar tema
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Atualizar localStorage quando as notas mudam
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Criar nova nota
  const createNewNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: t("sidebar.untitled"),
      content: "",
      updatedAt: new Date(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setCurrentNoteId(newNote.id);
  }, [t]);

  // Atualizar nota
  const updateNote = useCallback((noteId: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  }, []);

  // Excluir nota
  const deleteNote = useCallback(
    (noteId: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      if (noteId === currentNoteId) setCurrentNoteId(null);
    },
    [currentNoteId]
  );

  // Nota atual selecionada
  const currentNote = notes.find((note) => note.id === currentNoteId) || null;

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <AuthProvider>
          <ErrorProvider>
            <div className="app-container">
              <Header
                darkMode={darkMode}
                toggleTheme={() => setDarkMode(!darkMode)}
              />

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
                      onSave={(content) =>
                        updateNote(currentNote.id, { content })
                      }
                    />
                  ) : (
                    <div className="empty-state">
                      <h2>{t("empty_state.title")}</h2>
                      <p>{t("empty_state.message")}</p>
                    </div>
                  )}
                </div>
              </main>

              <Footer />
            </div>
          </ErrorProvider>
        </AuthProvider>
      </Suspense>
    </I18nextProvider>
  );
};

export default App;
