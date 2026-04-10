import Link from "next/link";
import LogoMark from "@/components/logo-mark";
import { instagramUrl, navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-white/65">
      <div className="section grid gap-10 py-12 md:grid-cols-3 md:py-16">
        <div>
          <LogoMark />
          <p className="mt-4 max-w-xs text-sm text-forest/70">
            Boutique on-site açaí catering for weddings, showers, corporate events, and gatherings that deserve a sweet,
            elevated touch.
          </p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-forest/80 hover:text-plum">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-plum">
              Instagram @numa.acai
            </a>
            <a href="mailto:hello@numaacai.com" className="hover:text-plum">
              hello@numaacai.com
            </a>
            <Link href="/inquiry" className="btn-secondary w-fit">
              Start Inquiry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
