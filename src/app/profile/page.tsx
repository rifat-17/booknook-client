"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Mail, UserRound } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-sm text-slate-500">Loading your profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <UserRound className="mb-4 h-12 w-12 text-slate-400" />
        <h1 className="text-2xl font-bold text-slate-900">
          Please sign in
        </h1>
        <p className="mt-2 text-slate-600">
          You need to sign in to view your profile.
        </p>

        <Link
          href="/sign-in"
          className="mt-6 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700"
        >
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F2] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
          <div className="bg-[#FCE9D6] px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-orange-100 shadow-sm">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile photo"}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound className="h-12 w-12 text-orange-600" />
              )}
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
              {user.name || "BookNook Reader"}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Welcome to your BookNook profile
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <BookOpen className="h-5 w-5 text-orange-600" />
              Personal Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-xl bg-[#FFF9F2] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Full Name
                  </p>
                  <p className="mt-1 truncate font-medium text-slate-900">
                    {user.name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-[#FFF9F2] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email Address
                  </p>
                  <p className="mt-1 truncate font-medium text-slate-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    Your BookNook Account
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Your account is ready to explore books.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}