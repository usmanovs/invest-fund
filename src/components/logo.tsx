/** Рабочее название проекта. «Тамчы» по-кыргызски — «капля». */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="inline-flex items-center gap-2 font-heading text-xl font-semibold tracking-tight">
        <svg viewBox="0 0 20 24" className="h-6 w-5" aria-hidden="true">
          <path
            d="M10 1.5c3.6 4.6 7.5 8.6 7.5 13a7.5 7.5 0 0 1-15 0c0-4.4 3.9-8.4 7.5-13Z"
            fill="var(--green)"
          />
        </svg>
        Тамчы
      </span>
    </span>
  );
}
