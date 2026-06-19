import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "deep" | "brown";
  id?: string;
}) {
  const bg =
    tone === "brown"
      ? "bg-[var(--color-brown)] text-[var(--color-cream)]"
      : tone === "deep"
        ? "bg-[var(--color-cream-deep)]"
        : "bg-[var(--color-cream)]";

  return (
    <section id={id} className={`py-14 sm:py-20 lg:py-32 ${bg} ${className ?? ""}`}>
      <div className="container-luxe">{children}</div>
    </section>
  );
}
