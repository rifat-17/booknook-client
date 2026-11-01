
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BookCard } from "@/components/home/book-card";
import { SectionHeading } from "@/components/home/section-heading";
import type { IBook } from "@/lib/books";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getLatestBooks(): Promise<IBook[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/latest-books`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch latest books");
  }

  return response.json();
}

export async function NewArrivals() {
  const books = await getLatestBooks();

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="new-arrivals-heading"
        title="New Arrivals"
        description="Discover the latest books added to our collection."
      />

      {books.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">
          No books available yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/books"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-orange-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
        >
          See All Books
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
