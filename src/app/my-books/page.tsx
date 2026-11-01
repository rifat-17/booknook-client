import MyBooksList from '@/components/books/MyBooksList';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: "My Books",
};

const MyBooksPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }


    return (
        <main className="min-h-screen bg-[#FAF8F3] px-4 py-16 text-[#172033] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        My Books
                    </h1>
                    <p className="mt-3 text-slate-600">
                        Manage the books you have added to BookNook.
                    </p>
                </div>

                <MyBooksList />
            </div>
        </main>
    );
};

export default MyBooksPage;