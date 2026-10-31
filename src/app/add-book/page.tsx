

import AddBookForm from '@/components/AddBookForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


const AddBookPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // only logged-in users can add books.
    if (!session) {
        redirect("/login?callbackURL=/add-book");
    }

    return (
        <div>
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
        </div>
    );
};

export default AddBookPage;