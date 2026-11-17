"use client";

import { useEffect, useState } from "react";

/** Theme toggle (dark is the default) and the link to the other language. */
export default function SiteControls({ themeLabel, langText, langLabel, langHref, langCode }: {
  themeLabel: string; langText: string; langLabel: string; langHref: string; langCode: string;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#f4f0e8" : "#000000");
  };

  return (
    <div className="controls">
      <a className="ctrl ctrl-lang" href={langHref} hrefLang={langCode} lang={langCode} aria-label={langLabel}>{langText}</a>
      <button type="button" className="ctrl ctrl-theme" onClick={toggle} aria-label={themeLabel} aria-pressed={theme === "light"} title={themeLabel}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          {theme === "dark" ? (
            <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          ) : (
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
            </g>
          )}
        </svg>
      </button>
    </div>
  );
}
