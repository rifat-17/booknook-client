"use client"


import { IBook } from '@/lib/books';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type DeleteBookDialogProps = {
    book: IBook;
    onClose: () => void;
    onDeleted: (bookId: string) => void;
};



const DeleteBookDialog = ({
    book,
    onClose,
    onDeleted,
}: DeleteBookDialogProps) => {

    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);

            if (!API_URL) {
                throw new Error("API URL is not configured.");
            }

            const token = await getTokenFromClient();
            if (!token) {
                throw new Error("Please log in again.");
            }

            const response = await fetch(`${API_URL}/books/${book._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete book.");
            }

            onDeleted(book._id);
            toast.success("Book deleted successfully!");

        } catch (error) {
            console.error("Delete book error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );

        } finally {
            setDeleting(false);
        }
    }



    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !deleting) {
                    onClose();
                }
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-book-title"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
                <div className="flex items-center justify-between">
                    <h2 id="delete-book-title" className="text-xl font-bold">
                        Delete Book?
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        aria-label="Close delete dialog"
                        className="rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mt-5 flex items-start gap-3">
                    <div className="rounded-full bg-red-100 p-3 text-red-600">
                        <Trash2 size={22} />
                    </div>

                    <p className="leading-7 text-slate-600">
                        Are you sure you want to delete{" "}
                        <strong className="text-slate-900">{book.title}</strong>?
                        This action cannot be undone.
                    </p>
                </div>

                <div className="mt-7 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-medium hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                    >
                        {deleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBookDialog;