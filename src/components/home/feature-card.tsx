import type { Feature } from "@/lib/books";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <article className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <span className="flex size-11 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-semibold text-[#172033]">{feature.title}</h3>
      <p className="text-sm text-slate-600">{feature.description}</p>
    </article>
  );
}
