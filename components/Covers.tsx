import type { Cover } from "@/lib/site";

/**
 * Drawn covers for projects that have no public screenshot yet. Each one shows how the product
 * works rather than imitating its UI. Replace with a real image by setting `image` in lib/site.ts.
 * Drawn light-on-dark in the site's black and gold; they stay dark in the light theme, like a screen.
 */
const ink = "#ede8df", dim = "#8b867d", line = "#3a3733", sun = "#c8a96a", sky = "#e8d4a8", panel = "#0b0a09";
const font = "'Hanken Grotesk', system-ui, sans-serif";

function Pop() {
  const cols = 7, rows = 3;
  return (
    <svg viewBox="0 0 800 450" aria-hidden="true" fontFamily={font}>
      <text x="48" y="70" fill={dim} fontSize="24">One command, every phone, the same instant</text>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        return <rect key={i} className="pop-phone" x={66 + c * 102} y={100 + r * 82} width="56" height="66" rx="9" />;
      })}
      <path d="M66 372 H734" stroke={line} strokeWidth="4" />
      <circle cx="230" cy="372" r="8" fill={ink} />
      <text x="230" y="414" textAnchor="middle" fill={dim} fontSize="21">command sent</text>
      <path d="M230 372 H540" stroke={sun} strokeWidth="4" />
      <circle cx="540" cy="372" r="11" fill={sun} />
      <text x="540" y="414" textAnchor="middle" fill={sun} fontSize="21">+350 ms, all phones fire</text>
    </svg>
  );
}

function Masroof() {
  const rows: [string, string, string][] = [["Groceries", "14 Nov 2026", "245.50"], ["Internet", "10 Nov 2026", "620.00"], ["Transport", "09 Nov 2026", "85.00"]];
  return (
    <svg viewBox="0 0 800 450" aria-hidden="true" fontFamily={font}>
      <text x="48" y="70" fill={dim} fontSize="24">GET /api/expenses</text>
      <rect x="48" y="94" width="704" height="246" rx="12" fill={panel} stroke={line} />
      <g fill={dim} fontSize="20">
        <text x="76" y="134">Title</text><text x="340" y="134">Date</text><text x="724" y="134" textAnchor="end">Amount (EGP)</text>
      </g>
      {rows.map(([t, d, a], i) => (
        <g key={t} transform={`translate(0 ${152 + i * 62})`}>
          <path d="M76 0 H724" stroke={line} />
          <text x="76" y="40" fill={ink} fontSize="24">{t}</text>
          <text x="340" y="40" fill={sky} fontSize="23">{d}</text>
          <text x="724" y="40" textAnchor="end" fill={ink} fontSize="24">{a}</text>
        </g>
      ))}
      <text x="48" y="398" fill={sun} fontSize="22">Dates stored as DateOnly, with no time zone to shift them</text>
    </svg>
  );
}

export default function CoverArt({ kind }: { kind: Cover }) {
  return (
    <div className="cover" dir="ltr">
      {kind === "pop" ? <Pop /> : <Masroof />}
    </div>
  );
}
