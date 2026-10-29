"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function HeroScene() {
  return <Hero3D />;
}
