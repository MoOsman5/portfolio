type Props = { height?: number; className?: string; title?: string; animated?: boolean };

/**
 * The MO partition mark. The M is a table split into slabs, the way the shipment tables were
 * partitioned by date; the O is a high-contrast Didone O. Ivory only, no enclosing shape.
 */
export function markPolygons(n: number) {
  const x0 = 8, x1 = 78, top = 14, base = 86, valley = 72, gap = n > 7 ? 2.2 : 3.2;
  const w = (x1 - x0 - gap * (n - 1)) / n, mid = (x0 + x1) / 2;
  const ty = (x: number) => valley - ((valley - top) * Math.abs(x - mid)) / (mid - x0);
  return Array.from({ length: n }, (_, i) => {
    const a = x0 + i * (w + gap), b = a + w;
    const [ya, yb] = i === 0 || i === n - 1 ? [top, top] : [ty(a), ty(b)];
    return `${a.toFixed(2)},${base} ${a.toFixed(2)},${ya.toFixed(2)} ${b.toFixed(2)},${yb.toFixed(2)} ${b.toFixed(2)},${base}`;
  });
}

export const O_PATH =
  "M120 14 a32 36 0 1 1 0 72 a32 36 0 1 1 0 -72 Z M120 16.6 a21.5 33.4 0 1 0 0 66.8 a21.5 33.4 0 1 0 0 -66.8 Z";

export default function Logo({ height = 28, className, title = "Mohamed Osman", animated = false }: Props) {
  const n = height >= 60 ? 9 : 7;
  return (
    <svg
      className={[className, animated ? "logo-animated" : ""].filter(Boolean).join(" ")}
      width={(height * 160) / 100}
      height={height}
      viewBox="0 0 160 100"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      {markPolygons(n).map((p, i) => (
        <polygon key={i} className="logo-slab" points={p} style={animated ? { animationDelay: `${0.08 * i}s` } : undefined} />
      ))}
      <path className="logo-o" fillRule="evenodd" d={O_PATH} />
    </svg>
  );
}
