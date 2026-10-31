type SectionHeadingProps = {
  id: string;
  title: string;
  description: string;
};

/**
 * Shared heading block used by the homepage sections.
 * `id` corresponds to the `aria-labelledby` value on the wrapping `<section>`.
 */
export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-[#172033] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-base text-slate-600">{description}</p>
    </div>
  );
}
