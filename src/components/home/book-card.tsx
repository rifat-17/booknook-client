import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Book } from "@/lib/books";

/**
 * Featured book card with a CSS-composed cover.
 * `book.cover.background` / `.foreground` hold Tailwind gradient/color classes
 * defined statically in `src/lib/books.ts` so Tailwind can scan them.
 */
export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* CSS book cover */}
      <div
        className={`relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-md ${book.cover.background} ${book.cover.foreground}`}
      >
        {/* Spine highlight */}
        <span className="absolute inset-y-0 left-0 w-3 bg-black/15" aria-hidden="true" />
        <span className="absolute inset-y-0 left-3 w-px bg-white/30" aria-hidden="true" />
        <div className="flex h-full flex-col justify-between p-5 pl-8">
          <span className="w-fit rounded-full bg-black/20 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase">
            {book.category}
          </span>
          <div>
            <h3 className="text-lg leading-tight font-semibold">{book.title}</h3>
            <p className="mt-1 text-xs opacity-80">{book.author}</p>
          </div>
        </div>
      </div>

      <h4 className="sr-only">{book.title}</h4>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-sm text-slate-600">{book.description}</p>
        <p className="mt-3 text-xs font-medium text-slate-500">{book.category}</p>

        <Link
          href={`/books/${book.id}`}
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg px-1.5 py-1 text-sm font-medium text-orange-700 transition-colors duration-200 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          View Details
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
