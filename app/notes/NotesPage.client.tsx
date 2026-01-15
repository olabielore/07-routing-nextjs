"use client";

import { useState } from "react";

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

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (

        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />
                <Pagination page={page} totalPages={4} onPageChange={setPage} /> 
                <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
            </header>

            <NoteList />
            
            {isModalOpen && (
                <Modal>
                    <NoteForm setIsModalOpen={setIsModalOpen} />
                </Modal>
            )}
        </div>
    );
}