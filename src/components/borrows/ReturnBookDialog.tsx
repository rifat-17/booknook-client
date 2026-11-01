import { IBorrow } from '@/lib/borrows';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import React, { useState } from 'react';
import { toast } from 'sonner';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ReturnBookDialogProps = {
    borrow: IBorrow;
    onClose: () => void;
    onReturned: (borrowId: string) => void;
};

const ReturnBookDialog = ({
    borrow,
    onClose,
    onReturned,
}: ReturnBookDialogProps) => {

    const [loading, setLoading] = useState(false);

    const handleReturn = async () => {
        try {
            setLoading(true);

            const token = await getTokenFromClient();

            const response = await fetch(
                `${API_URL}/borrows/${borrow._id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to return book.");
            }

            toast.success(data.message || "Book returned successfully!");

            onReturned(borrow._id);
            onClose();


        } catch (error) {
            console.error("Return book error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );


        } finally {
            setLoading(false);
        }
    }


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={onClose}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="return-dialog-title"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <h2
                    id="return-dialog-title"
                    className="text-xl font-bold text-[#172033]"
                >
                    Return This Book?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Are you sure you want to return{" "}
                    <span className="font-semibold text-[#172033]">
                        {borrow.bookTitle}
                    </span>
                    ?
                </p>

                <div className="mt-7 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleReturn}
                        disabled={loading}
                        className="rounded-lg bg-orange-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Returning..." : "Confirm Return"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReturnBookDialog;