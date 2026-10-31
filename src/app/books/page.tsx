import { AllBookCard } from '@/components/books/AllBookCard';
import { IBook } from '@/lib/books';
import React from 'react';


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const getBooks = async (): Promise<IBook[]> => {
    const response = await fetch(`${API_URL}/books`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }

    return response.json();
}

const AllBooksPage = async () => {

    const books = await getBooks();

    return (
        <main className="min-h-screen bg-[#FAF8F3] px-4 py-16 text-[#172033] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Explore All Books
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Discover your next favorite book from our collection.
                    </p>
                </div>

                {books.length === 0 ? (
                    <p className="py-16 text-center text-slate-500">
                        No books available right now.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <AllBookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
};

export default AllBooksPage;