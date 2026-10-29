import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "./writing.css";
import Cosmos from "@/components/Cosmos";
import Motion from "@/components/Motion";
import SiteNav from "@/components/SiteNav";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Inner pages have no preloader, so they are ready straight away. */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("is-ready")` }} />
      <Cosmos />
      <Motion />
      <SiteNav />
      <main id="main" className="w-main">{children}</main>
      <footer className="footer">
        <p className="footer-mark"><Logo height={16} title="" /> © 2026 Mohamed Osman</p>
        <Link href="/" className="to-top">Back to the portfolio</Link>
      </footer>
    </>
  );
}
