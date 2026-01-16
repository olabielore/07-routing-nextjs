"use client";

import type { Note } from "@/lib/types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p>No notes found</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
