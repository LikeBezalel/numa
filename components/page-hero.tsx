interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="section pb-10 pt-14">
      <p className="text-xs uppercase tracking-[0.22em] text-berry">{eyebrow}</p>
      <h1 className="h1 mt-4 max-w-3xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-forest/75 md:text-lg">{subtitle}</p>
    </section>
  );
}
