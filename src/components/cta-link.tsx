import { cn } from "@/lib/utils";

const styles = {
  primary: "bg-green text-white hover:bg-green-deep",
  navy: "bg-navy text-white hover:bg-navy-deep",
  ghost: "border border-line bg-white text-ink hover:border-ink",
  ghostOnNavy: "border border-white/30 text-white hover:border-white",
};

export function CtaLink({
  href,
  variant = "primary",
  size = "lg",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  size?: "sm" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium whitespace-nowrap transition-colors",
        size === "lg" ? "h-13 px-7 text-base" : "h-10 px-4 text-sm",
        styles[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
