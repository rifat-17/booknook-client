
import { AllBookCard } from "@/components/books/AllBookCard";
import { CategoryFilter } from "@/components/books/CategoryFilter";

import type { IBook } from "@/lib/books";
import { categories } from "@/lib/books";
import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
    title: "All Books",
};

interface AllBooksPageProps {
    searchParams: Promise<{
        category?: string;
    }>;
}

const getBooks = async (): Promise<IBook[]> => {
    const response = await fetch(`${API_URL}/books`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }

    return response.json();
};

const normalizeCategory = (value: string) =>
    value.toLowerCase().trim().replace(/\s+/g, "-");

const AllBooksPage = async ({ searchParams }: AllBooksPageProps) => {
    const { category } = await searchParams;

    const books = await getBooks();

    const selectedCategory = categories.find(
        (item) => item.slug === category
    );

    const filteredBooks = category
        ? selectedCategory
            ? books.filter(
                (book) =>
                    normalizeCategory(book.category) ===
                    normalizeCategory(selectedCategory.name) ||
                    normalizeCategory(book.category) ===
                    normalizeCategory(selectedCategory.slug)
            )
            : []
        : books;

    const pageTitle = selectedCategory
        ? `${selectedCategory.name} Books`
        : "Explore All Books";

    return (
        <main className="min-h-screen bg-[#FAF8F3] px-4 py-16 text-[#172033] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        {pageTitle}
                    </h1>

                    <p className="mt-3 text-slate-600">
                        {selectedCategory
                            ? `Explore our collection of ${selectedCategory.name.toLowerCase()} books.`
                            : "Discover your next favorite book from our collection."}
                    </p>
                </div>

                <CategoryFilter
                    categories={categories}
                    selectedCategory={category}
                />

                {filteredBooks.length === 0 ? (
                    <p className="py-16 text-center text-slate-500">
                        No books found in this category.
                    </p>
                ) : (
                    <>
                        <p className="mb-6 text-sm text-slate-500">
                            Showing {filteredBooks.length} books
                        </p>


                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredBooks.map((book) => (
                                <AllBookCard key={book._id} book={book} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default AllBooksPage;
