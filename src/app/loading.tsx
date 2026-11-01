
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
      <LoadingSpinner message="Loading BookNook..." />
    </main>
  );
}
