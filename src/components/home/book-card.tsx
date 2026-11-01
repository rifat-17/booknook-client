
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { IBook } from "@/lib/books";

export function BookCard({ book }: { book: IBook }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Book Image */}
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          By {book.author}
        </p>

        <p className="mt-3 text-xs font-medium text-slate-500">
          {book.category}
        </p>

        {/* View Details */}
        <Link
          href={`/books/${book._id}`}
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg px-1.5 py-1 text-sm font-medium text-orange-700 transition-colors duration-200 hover:text-orange-800"
        >
          View Details
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
