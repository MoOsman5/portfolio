"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

/**
 * Draws the route mark once per visit, then lifts away.
 * It is in the server HTML so there is no flash; CSS times the exit (works without JS),
 * and an inline script in <head> skips it for repeat views and reduced motion.
 */
export default function Intro() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    try { sessionStorage.setItem("mo-intro", "1"); } catch {}
    const t = window.setTimeout(() => setGone(true), 2600);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="splash" aria-hidden="true">
      <Logo height={110} animated title="" />
      <p className="splash-name">Mohamed Osman</p>
    </div>
  );
}
