import type { LucideIcon } from "lucide-react";
import {
  BookText,
  BookUser,
  BookmarkCheck,
  Clock3,
  Compass,
  Cpu,
  FlaskConical,
  Landmark,
  Sparkles,
} from "lucide-react";

/**
 * Static sample data for the homepage.
 *
 * When the MongoDB API is ready, replace the arrays below with fetched data,
 * or have the homepage load them from `src/app/api` — the shape of these types
 * is what the API should return.
 */


export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  imageUrl: string;
  addedBy?: {
    userId: string;
    name?: string;
    email?: string;
  };
}


export type Category = {
  /** URL-friendly identifier used as the `category` query parameter. */
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export type BookCover = {
  /** Tailwind gradient classes for the cover background. */
  background: string;
  /** Tailwind text color classes that stay readable on the cover. */
  foreground: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: BookCover;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    slug: "fiction",
    name: "Fiction",
    description: "Novels and short stories that carry you to other lives and worlds.",
    icon: BookText,
  },
  {
    slug: "science",
    name: "Science",
    description: "From physics to biology, the ideas that explain our universe.",
    icon: FlaskConical,
  },
  {
    slug: "technology",
    name: "Technology",
    description: "Code, systems, and the tools shaping the modern world.",
    icon: Cpu,
  },
  {
    slug: "history",
    name: "History",
    description: "Peoples, empires, and events that shaped where we are today.",
    icon: Landmark,
  },
  {
    slug: "biography",
    name: "Biography",
    description: "Real lives and remarkable journeys, told in their own words.",
    icon: BookUser,
  },
  {
    slug: "fantasy",
    name: "Fantasy",
    description: "Magic, quests, and mythologies beyond the familiar map.",
    icon: Sparkles,
  },
];

export const featuredBooks: Book[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    description:
      "Sparks fly and misunderstandings unravel in Austen's beloved romance of manners in Regency England.",
    cover: {
      background: "bg-gradient-to-br from-amber-600 to-[#7C2D12]",
      foreground: "text-amber-50",
    },
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    category: "Fantasy",
    description:
      "On the desert planet Arrakis, young Paul Atreides is drawn into a war over the most valuable substance in the universe.",
    cover: {
      background: "bg-gradient-to-br from-orange-500 to-[#9A3412]",
      foreground: "text-orange-50",
    },
  },
  {
    id: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    description:
      "Hawking explains black holes, the big bang, and the arrow of time for readers without a physics degree.",
    cover: {
      background: "bg-gradient-to-br from-blue-700 to-[#172033]",
      foreground: "text-blue-50",
    },
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    description:
      "A sweeping account of how an unremarkable ape came to dominate the planet, from the Stone Age to the digital era.",
    cover: {
      background: "bg-gradient-to-br from-teal-600 to-[#134E4A]",
      foreground: "text-teal-50",
    },
  },
  {
    id: "educated",
    title: "Educated",
    author: "Tara Westover",
    category: "Biography",
    description:
      "The memoir of a girl raised in a survivalist family in rural Idaho who taught herself enough to earn a Cambridge PhD.",
    cover: {
      background: "bg-gradient-to-br from-[#64748B] to-slate-800",
      foreground: "text-slate-100",
    },
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    description:
      "A handbook of software craftsmanship, filled with principles and practices for writing code that lasts.",
    cover: {
      background: "bg-gradient-to-br from-[#EA580C] to-[#9A3412]",
      foreground: "text-orange-50",
    },
  },
];

export const features: Feature[] = [
  {
    title: "Discover Amazing Books",
    description: "Explore a diverse collection of books.",
    icon: Compass,
  },
  {
    title: "Easy Borrowing",
    description: "Make borrowing books simple and convenient.",
    icon: BookmarkCheck,
  },
  {
    title: "Track Your Reading",
    description: "Manage your borrowed books in one place.",
    icon: Clock3,
  },
];
