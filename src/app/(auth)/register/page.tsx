"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const validationErrors = [];

    if (!/[A-Z]/.test(password)) {
      validationErrors.push("At least one uppercase letter is required.");
    }

    if (!/[a-z]/.test(password)) {
      validationErrors.push("At least one lowercase letter is required.");
    }

    if (password.length < 6) {
      validationErrors.push("Password must be at least 6 characters.");
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordErrors = validatePassword(formData.password);
    setErrors(passwordErrors);

    if (passwordErrors.length > 0) return;

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image || undefined,
        callbackURL: "/login",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully! Please log in.");
      redirect('/login')
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join BookNook and discover your next favorite book.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

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
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Profile Photo URL <span className="text-slate-400">(Optional)</span>
            </label>
            <input
              id="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors(validatePassword(e.target.value));
                }}
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

            <div className="mt-2 space-y-1">
              {errors.map((error) => (
                <p key={error} className="text-xs text-red-600">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || errors.length > 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-700 hover:text-orange-800"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}