"use client";

import { IBook } from '@/lib/books';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import React, { useState } from 'react';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type BorrowBookDialogProps = {
    book: IBook;
    userName: string;
    userEmail: string;
    onClose: () => void;
    onBorrowed: () => void;
};



const BorrowBookDialog = ({
    book,
    userName,
    userEmail,
    onClose,
    onBorrowed,
}: BorrowBookDialogProps) => {

    const [loading, setLoading] = useState(false);

    const handleBorrow = async () => {
        try {
            setLoading(true);

            const token = await getTokenFromClient();

            const response = await fetch(`${API_URL}/borrows`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookId: book._id,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to borrow book.");
            }

            toast.success(data.message || "Book borrowed successfully!");

            onBorrowed();
            onClose();

        } catch (error) {
            console.error("Borrow book error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }



    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="borrow-dialog-title"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <h2
                    id="borrow-dialog-title"
                    className="text-2xl font-bold text-[#172033]"
                >
                    Borrow This Book
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Your borrowing period will be 14 days.
                </p>

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Book Title
                        </label>
                        <input
                            value={book.title}
                            readOnly
                            className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-slate-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Your Name
                        </label>
                        <input
                            value={userName}
                            readOnly
                            className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-slate-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Your Email
                        </label>
                        <input
                            value={userEmail}
                            readOnly
                            className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-slate-600"
                        />
                    </div>
                </div>

                <div className="mt-7 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleBorrow}
                        disabled={loading}
                        className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Borrowing..." : "Confirm Borrow"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BorrowBookDialog;