import { cn } from "@/lib/utils";

type Tone = "white" | "mist" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "on-navy bg-navy",
};

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(tones[tone], "py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  lead,
  className,
}: {
  title: string;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-3xl leading-[1.12] font-semibold md:text-[2.75rem]">{title}</h2>
      {lead ? <p className="mt-5 text-lg text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
