import { Suspense } from "react";
import AddBookForm from "@/components/AddBookForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function AddBookContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackURL=/add-book");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Add a New Book
        </h1>

        <p className="mt-2 text-slate-600">
          Share a book with the BookNook community.
        </p>
      </div>

      <AddBookForm
        userName={session.user.name}
        userEmail={session.user.email}
      />
    </main>
  );
}

export default function AddBookPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-slate-500">Loading Add Book page...</p>
        </main>
      }
    >
      <AddBookContent />
    </Suspense>
  );
}