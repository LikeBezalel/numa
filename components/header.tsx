import Link from "next/link";
import { inquiryUrl, navLinks } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-serif text-xl tracking-wide text-forest">
          NÜMA Açaí
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-forest/80 transition hover:text-forest">
              {link.label}
            </Link>
          ))}
        </nav>
        <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-primary text-xs md:text-sm">
          Inquire to Book
        </a>
      </div>
    </header>
  );
}
