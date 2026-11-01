
import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4">
      <div className="max-w-lg text-center">

        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-orange-100">
          <BookOpen className="size-10 text-orange-700" />
        </div>

        <p className="mt-8 text-7xl font-bold text-orange-700">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#172033]">
          Page Not Found
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Sorry! The page or book you're looking for
          doesn't exist or may have been removed.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-700 px-6 py-3 font-semibold text-white transition hover:bg-orange-800"
        >
          <Home className="size-5" />
          Back to Home
        </Link>

      </div>
    </main>
  );
}
