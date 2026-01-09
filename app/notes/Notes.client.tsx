"use client";

import { useState } from "react";
import { useQuery, keepPreviousData} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

import Pagination  from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";


import css from "./NotesPage.module.css";


export default function NotesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [debouncedSearch] = useDebounce(search, 1000);
    const perPage = 12;
      
      const closeModal = (): void => {
        setIsModalOpen(false);
      };
    
    const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
        queryKey: ["notes", page, debouncedSearch],
        queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch, }),
        placeholderData: keepPreviousData,
    });

    const totalPages = data?.totalPages ?? 0;
    const notes = data?.notes ?? [];

    const handlePageChange = (page: number) => {
        setPage(page);
    };
    
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    if (isError) {
        return <p>Something went wrong!</p>;
    }
    
    return (

        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />
                {totalPages > 1 && ( 
                    <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} /> 
                )}
                <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
            </header>

            {!isLoading && notes.length > 0 && (
                <NoteList notes={notes}/>
            )}
            {isModalOpen && (
                <Modal isOpen={true} onClose={closeModal}>
                    <NoteForm setIsModalOpen={setIsModalOpen} />
                </Modal>
            )}
        </div>
    );
}