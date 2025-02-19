export interface NoteHistoryEntry {
  timestamp: Date;
  content: string;
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  updatedAt: Date;
  history: NoteHistoryEntry[];
}
