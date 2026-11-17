import type { Cover } from "@/lib/site";

/**
 * Drawn covers for projects that have no public screenshot yet. Each one shows how the product
 * works rather than imitating its UI. Replace with a real image by setting `image` in lib/site.ts.
 */
const ink = "#EAF0F6", dim = "#8FA3B8", line = "#2B4059", sun = "#FFC531", sky = "#8DBBEA", panel = "#13263A";
const font = "'IBM Plex Sans', system-ui, sans-serif";

function Awn() {
  const steps = ["Lead", "Quotation", "Contract", "Invoice", "Renewal"];
  return (
    <svg viewBox="0 0 800 450" aria-hidden="true" fontFamily={font}>
      <text x="48" y="74" fill={dim} fontSize="24">Client lifecycle</text>
      <path d="M96 150 H704" stroke={line} strokeWidth="4" />
      <path d="M96 150 H552" stroke={sun} strokeWidth="4" />
      {steps.map((s, i) => {
        const x = 96 + i * 152, done = i <= 3;
        return (
          <g key={s}>
            <circle cx={x} cy="150" r="15" fill={done ? sun : panel} stroke={done ? sun : line} strokeWidth="4" />
            <text x={x} y="202" textAnchor="middle" fill={done ? ink : dim} fontSize="23" fontWeight={i === 3 ? 600 : 400}>{s}</text>
          </g>
        );
      })}
      <rect x="48" y="246" width="704" height="160" rx="12" fill={panel} stroke={line} />
      <text x="76" y="290" fill={dim} fontSize="21">Who can see this contract</text>
      {[["Sales", "own"], ["Account Manager", "branch"], ["Finance", "all"]].map(([r, sc], i) => {
        const x = [76, 250, 560][i], w = sc.length * 13 + 30;
        return (
          <g key={r} transform={`translate(${x} 306)`}>
            <text y="26" fill={ink} fontSize="23">{r}</text>
            <rect x="0" y="42" width={w} height="36" rx="18" fill="none" stroke={i === 2 ? sun : sky} strokeWidth="1.5" />
            <text x={w / 2} y="67" textAnchor="middle" fill={i === 2 ? sun : sky} fontSize="20">{sc}</text>
          </g>
        );
      })}
    </svg>
  );
}

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

function Mahsoom() {
  const rows: [string, string, string][] = [["Restock", "+12", "12"], ["Sale", "−11", "1"]];
  return (
    <svg viewBox="0 0 800 450" aria-hidden="true" fontFamily={font}>
      <text x="48" y="70" fill={dim} fontSize="24">Stock ledger, append-only</text>
      {rows.map(([a, b, c], i) => (
        <g key={i} transform={`translate(48 ${94 + i * 66})`}>
          <rect width="704" height="54" rx="8" fill={panel} stroke={line} />
          <text x="24" y="35" fill={ink} fontSize="23">{a}</text>
          <text x="450" y="35" textAnchor="end" fill={b.startsWith("+") ? sky : ink} fontSize="23">{b}</text>
          <text x="680" y="35" textAnchor="end" fill={dim} fontSize="22">left: {c}</text>
        </g>
      ))}
      <text x="48" y="272" fill={dim} fontSize="24">Two buyers, one unit left</text>
      <g transform="translate(48 294)">
        <rect width="340" height="112" rx="12" fill="none" stroke={sun} strokeWidth="2.5" />
        <text x="24" y="46" fill={ink} fontSize="25" fontWeight="600">Buyer A</text>
        <text x="24" y="84" fill={sun} fontSize="22">Order confirmed</text>
      </g>
      <g transform="translate(412 294)">
        <rect width="340" height="112" rx="12" fill="none" stroke={line} strokeWidth="2.5" />
        <text x="24" y="46" fill={ink} fontSize="25" fontWeight="600">Buyer B</text>
        <text x="24" y="84" fill={dim} fontSize="22">Rejected, out of stock</text>
      </g>
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
      {kind === "awn" ? <Awn /> : kind === "pop" ? <Pop /> : kind === "mahsoom" ? <Mahsoom /> : <Masroof />}
    </div>
  );
}
