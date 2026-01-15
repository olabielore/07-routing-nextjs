"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css"

type NotePreviewProps = {
  id: string;
};

export default function NotePreview({ id }: NotePreviewProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

    if (isLoading) return <Modal>Loading...</Modal>;
    if (!data) return <p>Note not found</p>;

  return (
    <Modal>
      <h2 className={css.title}>{data.title}</h2>
      <p className={css.content}>{data.content}</p>
      <span className={css.tag}>{data.tag}</span>
    </Modal>
  );
}
