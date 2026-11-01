
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

type AddBookFormProps = {
  userName: string;
  userEmail: string;
};

export default function AddBookForm({
  userName,
  userEmail,
}: AddBookFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCopies, setTotalCopies] = useState("1");


  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!Number.isInteger(Number(totalCopies)) || Number(totalCopies) < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setLoading(true);

      const token = await getTokenFromClient();

      const bookResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          author,
          category,
          description,
          imageUrl,
          totalCopies: Number(totalCopies),
        }),
      });

      const bookResult = await bookResponse.json();

      if (!bookResponse.ok) {
        throw new Error(bookResult.message || "Failed to add book");
      }

      toast.success("Book added successfully!");

      setTitle("");
      setAuthor("");
      setCategory("");
      setDescription("");
      setImageUrl("");
      setImageError(false);
      setTotalCopies("1");

      router.push("/my-books");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Book Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium"
        >
          Book Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          className={inputClass}
          required
          maxLength={150}
        />
      </div>

      {/* Author Name */}
      <div>
        <label
          htmlFor="author"
          className="mb-2 block text-sm font-medium"
        >
          Author Name
        </label>

        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          className={inputClass}
          required
          maxLength={100}
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
          required
        >
          <option value="">Select a category</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Book Image URL */}
      <div>
        <label
          htmlFor="imageUrl"
          className="mb-2 block text-sm font-medium"
        >
          Book Image URL
        </label>

        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImageError(false);
          }}
          placeholder="https://example.com/book-image.jpg"
          className={inputClass}
          required
        />

        <p className="mt-2 text-xs text-slate-500">
          Paste a publicly accessible image URL.
        </p>

        {/* Image Preview */}
        {imageUrl && !imageError && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Image Preview
            </p>

            <img
              src={imageUrl}
              alt="Book preview"
              className="h-48 w-36 rounded-lg border border-slate-200 object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        {imageError && (
          <p className="mt-2 text-sm text-red-500">
            Unable to load this image. Please check the URL.
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium"
        >
          Short Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description about the book"
          rows={4}
          maxLength={1000}
          className={inputClass}
          required
        />
      </div>


      {/* total copies */}
      <div>
        <label
          htmlFor="totalCopies"
          className="mb-2 block text-sm font-medium"
        >
          Total Copies
        </label>

        <input
          id="totalCopies"
          type="number"
          min="1"
          step="1"
          required
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
          placeholder="Enter total copies"
          className={inputClass}
        />
      </div>


      {/* User Information */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="userName"
            className="mb-2 block text-sm font-medium"
          >
            Added By
          </label>

          <input
            id="userName"
            value={userName}
            readOnly
            className={`${inputClass} bg-slate-100 text-slate-500`}
          />
        </div>

        <div>
          <label
            htmlFor="userEmail"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="userEmail"
            type="email"
            value={userEmail}
            readOnly
            className={`${inputClass} bg-slate-100 text-slate-500`}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Adding Book..." : "Add Book"}
      </button>
    </form>
  );
}
