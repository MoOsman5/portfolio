"use client";

import { useEffect, useState } from "react";

// 20,000,000 shipments a year, spread evenly.
const PER_SECOND = 20_000_000 / (365 * 24 * 3600);

export default function ShipmentCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      setCount(Math.floor(((performance.now() - start) / 1000) * PER_SECOND));
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="counter">
      <span className="counter-n">{count.toLocaleString("en-US")}</span>
      <span className="counter-l">
        shipments the platform I built would have moved since you opened this page
      </span>
    </p>
  );
}
