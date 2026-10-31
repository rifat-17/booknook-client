import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { IBook } from "@/lib/books";

export function AllBookCard({ book }: { book: IBook }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">

      {/* Book Cover */}
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col pt-4">
        <span className="mb-2 w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          {book.category}
        </span>

        <h2 className="text-lg font-semibold text-[#172033]">
          {book.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          By {book.author}
        </p>

        <Link
          href={`/books/${book._id}`}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-orange-700 hover:text-orange-800"
        >
          View Details
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}