import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="NÜMA was created for hosts who care about beauty, quality, and atmosphere."
        subtitle="Born from a love of gathering, thoughtful presentation, and fresh ingredients, NÜMA blends hospitality with design-forward catering for meaningful events."
      />
      <section className="section grid gap-6 pt-0 md:grid-cols-2">
        <article className="card">
          <h2 className="font-serif text-3xl text-plum">Why NÜMA exists</h2>
          <p className="mt-4 text-sm leading-relaxed text-forest/75">
            We believe catering should feel intentional and personal. NÜMA was built to offer a boutique alternative for
            special events where every detail matters.
          </p>
        </article>
        <article className="card">
          <h2 className="font-serif text-3xl text-plum">Freshness + refinement</h2>
          <p className="mt-4 text-sm leading-relaxed text-forest/75">
            Every bowl, garnish, and setup element is prepared with quality and care so the experience feels elevated,
            warm, and trustworthy.
          </p>
        </article>
        <article className="card md:col-span-2">
          <h2 className="font-serif text-3xl text-plum">Founder section (ready to personalize)</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-forest/75">
            Replace this section with your personal founder story and portrait. Share how NÜMA began, what inspires your
            hosting style, and why serving beautiful moments matters to you.
          </p>
        </article>
      </section>
    </>
  );
}
