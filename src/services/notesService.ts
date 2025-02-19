import { Note } from "../types/note";
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
  console.log(querySnapshot);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  } as Note));
};

export const updateNote = async (
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
