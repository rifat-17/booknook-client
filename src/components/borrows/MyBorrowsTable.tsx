"use client";

import { IBorrow } from '@/lib/borrows';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ReturnBookDialog from './ReturnBookDialog';
import Image from 'next/image';


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const MyBorrowsTable = () => {

    const [borrows, setBorrows] = useState<IBorrow[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBorrow, setSelectedBorrow] =
        useState<IBorrow | null>(null);

    useEffect(() => {
        const fetchMyBorrows = async () => {
            try {
                if (!API_URL) {
                    throw new Error("API URL is not configured.");
                }

                const token = await getTokenFromClient();

                const response = await fetch(`${API_URL}/my-borrows`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch borrowed books."
                    );
                }

                setBorrows(data);
            } catch (error) {
                console.error("Fetch borrows error:", error);

                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load borrowed books."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyBorrows();
    }, []);


    const handleReturned = (borrowId: string) => {
        setBorrows((previousBorrows) =>
            previousBorrows.filter((borrow) => borrow._id !== borrowId)
        );
    };

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    if (loading) {
        return (
            <p className="py-16 text-center text-slate-500">
                Loading your borrowed books...
            </p>
        );
    }

    if (borrows.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <h2 className="text-xl font-semibold">
                    No Borrowed Books Yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Explore our collection and borrow your first book!
                </p>
            </div>
        );
    }

    return (
        <>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[750px] text-left">
          <thead className="bg-slate-100 text-sm text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Book</th>
              <th className="px-6 py-4 font-semibold">
                Borrow Date
              </th>
              <th className="px-6 py-4 font-semibold">
                Return Date
              </th>
              <th className="px-6 py-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {borrows.map((borrow) => (
              <tr key={borrow._id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <span className="font-semibold text-[#172033]">
                      {borrow.bookTitle}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(borrow.borrowDate)}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(borrow.returnDate)}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedBorrow(borrow)}
                    className="rounded-lg bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-200"
                  >
                    Return Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBorrow && (
        <ReturnBookDialog
          borrow={selectedBorrow}
          onClose={() => setSelectedBorrow(null)}
          onReturned={handleReturned}
        />
      )}
    </>
    );
};

export default MyBorrowsTable;