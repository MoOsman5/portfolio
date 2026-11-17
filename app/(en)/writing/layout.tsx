import "./writing.css";
import SiteNav from "@/components/SiteNav";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main" className="w-main">{children}</main>
      <footer className="footer wrap">
        <p><Logo height={14} title="" /> © 2026 Mohamed Osman</p>
        <Link href="/" className="text-link">Back to the portfolio</Link>
      </footer>
    </>
  );
}
