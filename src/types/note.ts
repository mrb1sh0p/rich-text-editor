import { Timestamp } from "firebase/firestore";

export interface NoteHistoryEntry {
  timestamp: Timestamp;
  content: string;
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  updatedAt: Timestamp;
  history: NoteHistoryEntry[];
}
