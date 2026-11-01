
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { IBook } from "@/lib/books";
import BorrowBookDialog from "./BorrowBookDialog";

type BorrowBookButtonProps = {
  book: IBook;
  userName: string;
  userEmail: string;
};

export default function BorrowBookButton({
  book,
  userName,
  userEmail,
}: BorrowBookButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-8 w-full rounded-xl bg-orange-700 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-800"
      >
        Borrow This Book
      </button>

      {isOpen && (
        <BorrowBookDialog
          book={book}
          userName={userName}
          userEmail={userEmail}
          onClose={() => setIsOpen(false)}
          onBorrowed={() => router.refresh()}
        />
      )}
    </>
  );
}
