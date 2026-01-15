"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "@/lib/api";
import { toast } from "react-hot-toast";
import css from "../NoteList/NoteList.module.css";
import Link from 'next/link';

interface NoteListProps {
    tag?: string;
    search?: string;
    page?: number;
}

export default function NoteList({ tag, search, page = 1 }: NoteListProps) {
    const queryClient = useQueryClient();

    const perPage = 12;
    
    const { data, isLoading } = useQuery({
        queryKey: ["notes", page, search, tag],
        queryFn: () => fetchNotes({ page, perPage, search, tag }),
      });
      
      const notes = data?.notes ?? [];

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note deleted");
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (notes.length === 0) {
        return <p>No notes found</p>;
    }
    
    return (
    <ul className={css.list}>
        {notes.map((note) => (
            <li className={css.listItem} key={note.id}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
                
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                    
                <Link href={`/notes/${note.id}`}>View details</Link>
                    
                <button className={css.button} onClick={() => deleteNoteMutation.mutate(note.id)} disabled={deleteNoteMutation.isPending} >Delete</button>
              </div>
            </li>
            ))}
    </ul>
    );
  }
