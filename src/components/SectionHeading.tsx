import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-3 ${align === "center" ? "mx-auto items-center text-center" : ""} ${className}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
