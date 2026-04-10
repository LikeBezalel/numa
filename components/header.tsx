import Link from "next/link";
import LogoMark from "@/components/logo-mark";
import { navLinks } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <LogoMark compact />
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-forest/80 transition hover:text-plum">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/inquiry" className="btn-primary text-xs md:text-sm">
          Inquire to Book
        </Link>
      </div>
      <nav className="scrollbar-none flex gap-4 overflow-x-auto border-t border-forest/10 px-5 pb-3 pt-2 text-xs lg:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-full border border-forest/20 bg-white/70 px-3 py-1.5">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
