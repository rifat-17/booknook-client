
type LoadingSpinnerProps = {
  message?: string;
};

export default function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      className="flex min-h-[250px] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="size-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-700" />

      <p className="text-sm font-medium text-slate-500">
        {message}
      </p>
    </div>
  );
}
