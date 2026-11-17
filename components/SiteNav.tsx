import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";
import SiteControls from "./SiteControls";

/** Header for inner pages (Writing). The home page has its own in-page anchors. */
export default function SiteNav() {
  return (
    <header className="nav nav-inner">
      <Link href="/" className="mark" aria-label="Mohamed Osman, home">
        <Logo height={24} title="Mohamed Osman" />
      </Link>
      <nav aria-label="Site">
        <Link href="/#work">Work</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/writing">Writing</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <div className="nav-end">
        <SiteControls themeLabel="Switch light and dark theme" langText="العربية" langLabel="Read the portfolio in Arabic" langHref="/ar" langCode="ar" />
        <a className="btn btn-small" href={site.cv} download>Download CV</a>
      </div>
    </header>
  );
}
