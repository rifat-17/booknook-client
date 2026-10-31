import Link from "next/link";
import type { Category } from "@/lib/books";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <Link
      href={`/books?category=${category.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
      <span className="flex size-11 items-center justify-center rounded-lg bg-orange-100 text-orange-700 transition-colors duration-200 group-hover:bg-orange-600 group-hover:text-white">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-semibold text-[#172033]">{category.name}</h3>
      <p className="text-sm text-slate-600">{category.description}</p>
    </Link>
  );
}
