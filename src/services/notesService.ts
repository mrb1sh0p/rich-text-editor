import { db } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

interface Note {
  title: string;
  content: string;
}

export const createNote = async (userId: string, noteData: Note) => {
  const userNotesRef = collection(db, "notes", userId, "userNotes");
  return await addDoc(userNotesRef, {
    ...noteData,
    updatedAt: serverTimestamp(),
  });
};

export const getNotes = async (userId: string) => {
  const querySnapshot = await getDocs(
    collection(db, "notes", userId, "userNotes")
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateNoteCloud = async (
  userId: string,
  noteId: string,
  updates: Partial<Note>
) => {
  const noteRef = doc(db, "notes", userId, "userNotes", noteId);
  await updateDoc(noteRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNote = async (userId: string, noteId: string) => {
  const noteRef = doc(db, "notes", userId, "userNotes", noteId);
  await deleteDoc(noteRef);
};
