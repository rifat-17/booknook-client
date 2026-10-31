"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BookOpen, Loader2, LogOut, Menu, UserCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const panelId = useId();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

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

  const handleSignOut = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out.");
        return;
      }

      setMenuOpen(false);
      toast.success("You have signed out successfully.");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

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

        {/* Desktop authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-orange-600" />
          ) : user ? (
            <>
              {/* User profile */}
              <div className="flex items-center gap-2">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User profile"}
                    className="size-9 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <UserCircle className="size-9 text-slate-500" />
                )}

                <span className="max-w-28 truncate text-sm font-medium text-slate-700">
                  {user.name}
                </span>
              </div>

              {/* Sign out */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
                Sign Out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
        <div
          id={panelId}
          className="border-t border-slate-200 bg-white md:hidden"
        >
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
            {isPending ? (
              <div className="flex justify-center py-2">
                <Loader2 className="size-5 animate-spin text-orange-600" />
              </div>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User profile"}
                      className="size-10 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <UserCircle className="size-10 text-slate-500" />
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
                >
                  {isLoggingOut ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  Sign Out
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>

  );
}
