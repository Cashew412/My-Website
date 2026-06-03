// Brand logos where available, with trademark-safe text/monogram fallbacks.
// Logos are trademarks of their respective owners.

export function LogoBadge({
  label,
  bg,
  color,
  img,
  tile,
  size = 48,
  rounded = "rounded-xl",
}: {
  label: string;
  bg: string;
  color: string;
  img?: string;
  tile?: string;
  size?: number;
  rounded?: string;
}) {
  if (img) {
    return (
      <div
        className={`grid shrink-0 place-items-center overflow-hidden border border-border ${rounded} shadow-soft`}
        style={{ width: size, height: size, background: tile || "#ffffff" }}
      >
        <img
          src={img}
          alt={`${label} logo`}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
        />
      </div>
    );
  }

  const isShort = label.length <= 4;
  return (
    <div
      className={`grid shrink-0 place-items-center ${rounded} font-display font-bold leading-none shadow-soft`}
      style={{
        width: size,
        height: size,
        background: bg,
        color,
        fontSize: isShort ? size * 0.34 : size * 0.2,
        letterSpacing: isShort ? "0.02em" : "0",
      }}
      aria-hidden="true"
    >
      <span className="px-1 text-center">{label}</span>
    </div>
  );
}
