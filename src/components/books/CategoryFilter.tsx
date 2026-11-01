"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/books";

interface CategoryFilterProps {
 categories: Pick<Category, "name" | "slug">[];
  selectedCategory?: string;  
}

export function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const filters = [
    { name: "All Books", slug: "" },
    ...categories.map((category) => ({
      name: category.name,
      slug: category.slug,
    })),
  ];

  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = filter.slug === (selectedCategory ?? "");

        return (
          <motion.div
            key={filter.slug || "all"}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={
                filter.slug
                  ? `/books?category=${filter.slug}`
                  : "/books"
              }
              aria-current={isActive ? "page" : undefined}
              className={`relative isolate block rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
                isActive
                  ? "text-white"
                  : "text-slate-600 hover:text-orange-700"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-category"
                  className="absolute inset-0 -z-10 rounded-full bg-orange-600"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              )}

              {filter.name}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}