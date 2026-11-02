import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { IBook } from "@/lib/books";

export function BookCard({ book }: { book: IBook }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Book Image */}
      <Link
        href={`/books/${book._id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-[#FFF3E3]"
        aria-label={`View ${book.title}`}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-5">

        <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
          {book.category}
        </span>

        <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-[#172033]">
          {book.title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          By {book.author}
        </p>

        {/* View Details */}
        <div className="mt-auto pt-5">
          <Link
            href={`/books/${book._id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-800"
          >
            View Details
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}