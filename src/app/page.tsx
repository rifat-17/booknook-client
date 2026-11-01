import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookCard } from "@/components/home/book-card";
import { CategoryCard } from "@/components/home/category-card";
import { FeatureCard } from "@/components/home/feature-card";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/home/section-heading";
import { categories, featuredBooks, features } from "@/lib/books";
import { NewArrivals } from "@/components/home/NewArrivals";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#172033]">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Browse Categories */}
      <section
        aria-labelledby="categories-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <SectionHeading
          id="categories-heading"
          title="Explore by Category"
          description="Find stories and knowledge across different genres."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Section 3: Featured Books */}
      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <NewArrivals/>
      </section>

      {/* Section 4: Why Choose BookNook? */}
      <section
        aria-labelledby="why-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <SectionHeading
          id="why-heading"
          title="Why Choose BookNook?"
          description="Everything you need for a seamless reading experience."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      {/* Section 5: Call To Action */}
      <section
        aria-labelledby="cta-heading"
        className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8"
      >
       <div className="rounded-3xl bg-[#172033] px-6 py-14 text-center shadow-lg sm:px-12 sm:py-16">
          <h2
            id="cta-heading"
            className="text-2xl font-semibold tracking-tight text-[#FAF8F3] sm:text-3xl"
          >
            Ready to Find Your Next Great Read?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
            Dive into the BookNook collection and discover stories, ideas, and
            knowledge waiting to be borrowed.
          </p>
          <Link
            href="/books"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-orange-600 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Explore the Collection
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
