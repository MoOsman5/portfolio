type Props = { size?: number; className?: string; title?: string; animated?: boolean };

/**
 * The MO route mark: one route that forms an M inside an open O.
 * Heavy strokes are the part of the route already delivered, hairlines the part still in transit,
 * and the gold point is the hub everything passes through.
 */
export default function Logo({ size = 40, className, title = "Mohamed Osman", animated = false }: Props) {
  return (
    <svg
      className={[className, animated ? "logo-animated" : ""].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
    >
      <path className="logo-o" d="M92.5 92.5 A46 46 0 1 0 27.5 92.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" pathLength={1} />
      <path className="logo-heavy" d="M27.5 92.5 L27.5 37 L60 68" fill="none" stroke="currentColor" strokeWidth="4.8" strokeLinejoin="miter" pathLength={1} />
      <path className="logo-thin" d="M60 68 L92.5 37 L92.5 92.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter" pathLength={1} />
      <circle className="logo-hub" cx="60" cy="68" r="4.4" fill="#C8A96A" />
    </svg>
  );
}
