"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";
import {
  BookOpen,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Login successful!");

      window.location.href = callbackURL;
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch {
      toast.error("Google login failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-5 inline-flex items-center gap-2">
            <span className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <BookOpen className="size-6" />
            </span>

            <span className="text-xl font-bold text-[#172033]">
              BookNook
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-[#172033]">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue your reading journey.
          </p>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-[#172033] transition-colors hover:bg-slate-50 disabled:opacity-60"
        >
          {/* {isGoogleLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <googleicon className="size-5" />
          )} */}

          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">OR CONTINUE WITH EMAIL</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Email Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <span className="text-xs font-medium text-slate-400">
                Forgot Password?
              </span>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-orange-700 hover:text-orange-800"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
          Loading...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}