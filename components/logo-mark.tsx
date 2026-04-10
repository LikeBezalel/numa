import Link from "next/link";

export default function LogoMark({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link href="/" className="inline-flex items-center gap-2" aria-label="NÜMA Açaí home">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-forest/25 bg-white text-base">🦥</span>
        <span className="font-serif text-xl tracking-[0.12em] text-plum">NÜMA</span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="NÜMA Açaí home">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-forest/25 bg-white text-lg shadow-soft">🦥</span>
      <span>
        <span className="block font-serif text-2xl leading-none tracking-[0.15em] text-plum">NÜMA</span>
        <span className="block text-[10px] uppercase tracking-[0.32em] text-forest/60">Açaí Event Catering</span>
      </span>
    </Link>
  );
}
