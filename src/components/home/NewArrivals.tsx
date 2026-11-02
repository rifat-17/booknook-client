import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { BookCard } from "@/components/home/book-card";
import { SectionHeading } from "@/components/home/section-heading";
import type { IBook } from "@/lib/books";

export function NewArrivals({ books }: { books: IBook[] }) {
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
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-white/50 px-6 py-14 text-center">
          <BookOpen className="size-10 text-orange-500" />

          <h3 className="mt-4 text-lg font-semibold text-[#172033]">
            No Books Available Yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            New books will appear here as soon as they are added.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/books"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-orange-600 px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          See All Books
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}