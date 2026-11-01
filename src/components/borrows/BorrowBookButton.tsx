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

  const isAvailable = book.totalCopies > 0;

  return (
    <>
      <div className="mt-8 space-y-3">
        <p className="text-sm font-medium text-slate-600">
          Available Copies:{" "}
          <span className="font-bold text-[#172033]">
            {book.totalCopies}
          </span>
        </p>

        <button
          type="button"
          disabled={!isAvailable}
          onClick={() => setIsOpen(true)}
          className="w-full rounded-xl bg-orange-700 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:bg-slate-400"
        >
          {isAvailable ? "Borrow This Book" : "Not Available"}
        </button>
      </div>

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