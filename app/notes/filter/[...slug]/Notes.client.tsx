"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./NotesPage.module.css";

interface NotesClientProps {
    tag?: string;
    search: string;
}

export default function NotesClient({ tag, search }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 1000);
  const perPage = 12;

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { tag, page, search: debouncedSearch }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search: debouncedSearch,
        tag,
      }),
      placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>

          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      <NoteList notes={data.notes} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </div>
  );
}
