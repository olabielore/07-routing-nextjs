"use client";

import css from "../Modal/Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
    children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  useEffect(() => {
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = '';
    };
  }, [router]);
    
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target === event.currentTarget) {
        router.back();
      }
    };
  
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>,
      document.body
  );
};