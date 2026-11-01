import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { featuredBooks } from "@/lib/books";

/**
 * Miniature CSS book cover, reused for the hero composition.
 * Full-sized versions of the same concept live in `book-card.tsx`.
 */
function HeroBookCover({
  background,
  foreground,
  title,
  className,
}: {
  background: string;
  foreground: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-md shadow-lg ${background} ${foreground} ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* Spine highlight */}
      <span className="absolute inset-y-0 left-0 w-2 bg-black/15" />
      <span className="absolute inset-y-0 left-2 w-px bg-white/30" />
      <div className="flex h-full flex-col justify-end p-3">
        <p className="text-[0.625rem] leading-snug font-semibold line-clamp-3">{title}</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative warm shape behind the composition */}
      <div
        className="pointer-events-none absolute top-16 right-[-6rem] -z-10 hidden size-96 rounded-full bg-orange-100/70 blur-3xl dark:bg-orange-950/30 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Copy + search */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Your next chapter starts here
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#172033] dark:text-white sm:text-5xl">
            Discover Your Next Favorite Book.
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            BookNook helps readers discover, explore, and borrow from a curated
            collection of fiction, science, history, and more. Find a story
            worth staying up late for.
          </p>

          {/* Plain HTML GET form — submits to /books?search=... with no client JS. */}
          <form action="/books" method="GET" className="mt-8 max-w-xl">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-[#172033] shadow-sm transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/30 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
                  aria-hidden="true"
                />
                <label htmlFor="hero-search" className="sr-only">
                  Search for books by title or author
                </label>
                <input
                  id="hero-search"
                  type="search"
                  name="search"
                  autoComplete="off"
                  placeholder="Search by title, author, or topic…"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-[#172033] shadow-sm transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/30 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-11 shrink-0 cursor-pointer rounded-lg bg-orange-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Find Books
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center gap-2">
            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-[#172033] underline-offset-4 transition-colors duration-200 hover:text-orange-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 dark:text-slate-200 dark:hover:text-orange-400"
            >
              Explore Collection
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">A world of stories, one library.</p>
        </div>

        {/* Book composition */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg" aria-hidden="true">
          <div className="relative flex aspect-4/3 items-center justify-center">
            {/* Back drop */}
            <div className="absolute inset-0 rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-colors duration-300 dark:bg-slate-900 dark:ring-white/10" />

            {/* Shelf line */}
            <div className="absolute right-6 bottom-8 left-6 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />

            {/* Standing books */}
            <HeroBookCover
              background={featuredBooks[0].cover.background}
              foreground={featuredBooks[0].cover.foreground}
              title={featuredBooks[0].title}
              className="absolute bottom-8 left-8 h-48 w-32 -rotate-3 lg:h-56 lg:w-36"
            />
            <HeroBookCover
              background={featuredBooks[3].cover.background}
              foreground={featuredBooks[3].cover.foreground}
              title={featuredBooks[3].title}
              className="absolute bottom-8 left-28 h-44 w-28 lg:left-32 lg:h-52 lg:w-32"
            />
            <HeroBookCover
              background={featuredBooks[2].cover.background}
              foreground={featuredBooks[2].cover.foreground}
              title={featuredBooks[2].title}
              className="absolute right-20 bottom-8 h-46 w-30 rotate-2 lg:right-24 lg:h-54 lg:w-34"
            />
            <HeroBookCover
              background={featuredBooks[1].cover.background}
              foreground={featuredBooks[1].cover.foreground}
              title={featuredBooks[1].title}
              className="absolute right-6 bottom-6 h-40 w-26 rotate-6 lg:h-48 lg:w-30"
            />

            {/* Leaning book */}
            <HeroBookCover
              background={featuredBooks[5].cover.background}
              foreground={featuredBooks[5].cover.foreground}
              title={featuredBooks[5].title}
              className="absolute right-1 bottom-7 h-40 w-24 rotate-12 lg:right-0 lg:h-48 lg:w-28"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
