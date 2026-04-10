import Link from "next/link";
import { inquiryUrl, navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-white/60">
      <div className="section grid gap-10 py-12 md:grid-cols-3 md:py-16">
        <div>
          <p className="font-serif text-2xl">NÜMA Açaí</p>
          <p className="mt-3 max-w-xs text-sm text-forest/70">
            Boutique on-site açaí catering for meaningful gatherings and elevated event moments.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-forest/60">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-forest/80 hover:text-forest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-forest/60">Connect</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="https://www.instagram.com/numa.acai/" target="_blank" rel="noreferrer" className="hover:text-berry">
              Instagram @numa.acai
            </a>
            <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-secondary w-fit">
              Inquire to Book
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
