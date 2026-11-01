
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/books";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <Link
      href={`/books?category=${category.slug}`}
      className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-500/40"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-500/10 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
          <Icon className="size-6" aria-hidden="true" />
        </span>

        <span className="flex size-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 group-hover:bg-orange-100 group-hover:text-orange-700 dark:group-hover:bg-orange-500/10 dark:group-hover:text-orange-400">
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#172033] transition-colors duration-200 group-hover:text-orange-700 dark:text-slate-100 dark:group-hover:text-orange-400">
          {category.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
