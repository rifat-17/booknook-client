
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import type { IBook } from "@/lib/books";

type MyBookCardProps = {
  book: IBook;
  onEdit: (book: IBook) => void;
  onDelete: (book: IBook) => void;
};

export default function MyBookCard({
  book,
  onEdit,
  onDelete,
}: MyBookCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <span className="mb-2 w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          {book.category}
        </span>

        <h2 className="text-lg font-semibold">
          {book.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          By {book.author}
        </p>

        <div className="mt-auto flex gap-3 pt-5">
          <button
            type="button"
            onClick={() => onEdit(book)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(book)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
