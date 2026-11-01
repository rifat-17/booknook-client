"use client";

import { IBook } from '@/lib/books';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { BookOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MyBookCard from './MyBookCard';
import EditBookDialog from './EditBookDialog';
import DeleteBookDialog from './DeleteBookDialog';


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const MyBooksList = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [deleteBook, setDeleteBook] = useState<IBook | null>(null);

    // Fetch books belonging to the logged-in user
    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                if (!API_URL) {
                    throw new Error("API URL is not configured.");
                }

                const token = await getTokenFromClient();

                if (!token) {
                    throw new Error("Please log in again.");
                }

                const response = await fetch(`${API_URL}/my-books`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch your books.");
                }

                setBooks(data);
            } catch (error) {
                console.error("Fetch my books error:", error);

                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load your books."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyBooks();
    }, []);

    // Update the selected book in the list
    const handleBookUpdated = (updatedBook: IBook) => {
        setBooks((previousBooks) =>
            previousBooks.map((book) =>
                book._id === updatedBook._id ? updatedBook : book)
        )

        setSelectedBook(null);
    }

    // Remove the deleted book from the list
    const handleBookDeleted = (bookId: string) => {
        setBooks((previousBooks) =>
            previousBooks.filter((book) => book._id !== bookId)
        );

        setDeleteBook(null);
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-slate-500">
                Loading your books...
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
                <BookOpen className="mx-auto size-12 text-slate-400" />

                <h2 className="mt-4 text-xl font-semibold">
                    You haven't added any books yet.
                </h2>

                <p className="mt-2 text-slate-500">
                    Add your first book to see it here.
                </p>
            </div>
        );
    }





    return (
        <>
            {/* Book list */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                    <MyBookCard
                        key={book._id}
                        book={book}
                        onEdit={setSelectedBook}
                        onDelete={setDeleteBook}
                    />
                ))}
            </div>

            {/* Edit dialog */}
            {selectedBook && (
                <EditBookDialog
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                    onUpdated={handleBookUpdated}
                />
            )}


            {/* Delete dialog */}
            {deleteBook && (
                <DeleteBookDialog
                    book={deleteBook}
                    onClose={() => setDeleteBook(null)}
                    onDeleted={handleBookDeleted}
                />
            )}
        </>
    );
};

export default MyBooksList;