"use client";

import type { Note } from "@/lib/types/note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "@/lib/api";
import { toast } from "react-hot-toast";
import css from "../NoteList/NoteList.module.css";
import Link from 'next/link';

interface NoteListProps {
    tag?: string;
}

export default function NoteList({ tag }: NoteListProps) {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["notes", tag],
        queryFn: () => fetchNotes({ tag }),
      });
      
    const notes = data?.notes ?? [];

    const deleteNoteMutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note deleted");
        },
    });

    const handleDelete = (id: string) => {
        deleteNoteMutation.mutate(id);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (notes.length === 0) {
        return <p>No notes found</p>;
    }
    
    return (
    <ul className={css.list}>
        {notes.map((note: Note) => (
            <li className={css.listItem} key={note.id}>
                <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
                    <button className={css.button} onClick={() => handleDelete(note.id)} disabled={deleteNoteMutation.isPending} >Delete</button>
            </div>
            </li>
            ))}
    </ul>
    );
  }
