import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About | NÜMA Açaí"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="NÜMA was created to make gatherings feel even more beautiful."
        subtitle="Rooted in a love for hosting and presentation, NÜMA Açaí brings fresh flavor and thoughtful styling together for events that feel warm, intentional, and elevated."
      />
      <section className="section grid gap-6 pt-0 md:grid-cols-2">
        <article className="card">
          <h2 className="font-serif text-3xl">Why NÜMA exists</h2>
          <p className="mt-4 text-sm leading-relaxed text-forest/75">
            We believe food experiences should feel as meaningful as the occasion itself. NÜMA was built to offer a
            boutique option for hosts who care about quality, ambiance, and hospitality.
          </p>
        </article>
        <article className="card">
          <h2 className="font-serif text-3xl">Freshness + quality</h2>
          <p className="mt-4 text-sm leading-relaxed text-forest/75">
            Every event is prepared with high standards for ingredients, presentation, and service. It is never just a
            bowl—it is a curated guest moment.
          </p>
        </article>
        <article className="card md:col-span-2">
          <h2 className="font-serif text-3xl">Founder note (optional section)</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-forest/75">
            Hi, I’m the heart behind NÜMA. I started this brand with a simple idea: celebrations deserve details that
            feel personal, warm, and beautifully made. Replace this section with your founder story and portrait when
            assets are ready.
          </p>
        </article>
      </section>
    </>
  );
}
