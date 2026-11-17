import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";
import SiteControls from "./SiteControls";

/** Header for inner pages (Writing). The home page has its own in-page anchors. */
export default function SiteNav() {
  return (
    <header className="nav nav-inner">
      <Link href="/" className="mark" aria-label="Mohamed Osman, home" data-magnetic>
        <Logo height={26} title="Mohamed Osman" />
      </Link>
      <nav aria-label="Site">
        <Link href="/#work"><span className="roll" data-text="Work">Work</span></Link>
        <Link href="/#experience"><span className="roll" data-text="Experience">Experience</span></Link>
        <Link href="/writing"><span className="roll" data-text="Writing">Writing</span></Link>
        <Link href="/#contact"><span className="roll" data-text="Contact">Contact</span></Link>
      </nav>
      <div className="nav-end">
        <a className="nav-cv" href={site.cv} download data-magnetic>Download CV</a>
        <SiteControls themeLabel="Switch light and dark theme" langText="العربية" langLabel="Read the portfolio in Arabic" langHref="/ar" langCode="ar" />
      </div>
    </header>
  );
}
