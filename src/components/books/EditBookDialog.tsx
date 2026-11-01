
"use client"

import { IBook } from '@/lib/books';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { X } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const categories = [
    "Fiction",
    "Science",
    "History",
    "Kids",
    "Others",
];

type EditBookDialogProps = {
    book: IBook;
    onClose: () => void;
    onUpdated: (updatedBook: IBook) => void;
};




const EditBookDialog = ({
    book,
    onClose,
    onUpdated,
}: EditBookDialogProps) => {

    const [formData, setFormData] = useState({
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        imageUrl: book.imageUrl,
    })

    const [saving, setSaving] = useState(false);

    const handleChange = (event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setSaving(true);

            if (!API_URL) {
                throw new Error("API URL is not configured.");
            }

            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Please log in again.");
            }

            const response = await fetch(`${API_URL}/books/${book._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update book.");
            }

            onUpdated({
                ...book,
                ...formData,
            });

            toast.success("Book updated successfully!");


        } catch (error) {
            console.error("Update book error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );

        } finally {
            setSaving(false);
        }


    }



    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !saving) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-book-title"
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 id="edit-book-title" className="text-xl font-bold">
                        Edit Book
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        aria-label="Close edit dialog"
                        className="rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="mb-1 block text-sm font-medium">
                            Book Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="mb-1 block text-sm font-medium">
                            Author
                        </label>
                        <input
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="mb-1 block text-sm font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-600"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-1 block text-sm font-medium"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-600"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="imageUrl"
                            className="mb-1 block text-sm font-medium"
                        >
                            Image URL
                        </label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-600"
                        />
                    </div>

                    <div className="flex gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-medium hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 rounded-lg bg-orange-700 px-4 py-3 font-semibold text-white hover:bg-orange-800 disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookDialog;