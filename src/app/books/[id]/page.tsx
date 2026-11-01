
import { auth } from "@/lib/auth";
import type { IBook } from "@/lib/books";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import BorrowBookButton from "@/components/borrows/BorrowBookButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getBook = async (id: string): Promise<IBook> => {
  const token = await getTokenFromServer();

  if (!token) {
    throw new Error("Unable to generate authentication token");
  }

  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  return response.json();
};

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Fetch book details
  const book = await getBook(id);

  const userName = session.user.name || "BookNook Member";
  const userEmail = session.user.email || "";

  return (
    <main className="min-h-screen bg-[#FAF8F3] px-4 py-16 text-[#172033] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-2">

          {/* Book Cover */}
          <div className="relative mx-auto aspect-2/3 w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col">
            <span className="mb-4 w-fit rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              By {book.author}
            </p>

            <div className="my-6 border-t border-slate-200" />

            <h2 className="mb-3 text-xl font-semibold">
              About This Book
            </h2>

            <p className="leading-8 text-slate-600">
              {book.description}
            </p>

            {/* Book Creator */}
            <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Added by
              </p>

              <p className="mt-1 font-semibold">
                {book.addedBy?.name || "BookNook Member"}
              </p>
            </div>

            {/* Borrow Button and Modal */}
            <BorrowBookButton
              book={book}
              userName={userName}
              userEmail={userEmail}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
