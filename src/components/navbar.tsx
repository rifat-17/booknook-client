"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
};

// Nav and auth destinations are defined once and rendered inline below.
const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Explore Books" },
  { href: "/my-borrowings", label: "My Borrowings" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-slate-900 transition-colors duration-200 hover:text-orange-700"
        >
          <BookOpen className="size-6 text-orange-600" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">
            BookNook
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-orange-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-orange-600"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-slate-900 transition-colors duration-200 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 md:hidden"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <div id={panelId} className="border-t border-slate-200 bg-white md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-orange-50 hover:text-orange-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-slate-100 px-4 py-3">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
