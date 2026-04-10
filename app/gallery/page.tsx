import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Gallery"
};

const shots = [
  "Bowl presentation",
  "Styled toppings bar",
  "Custom signage moment",
  "Pop-up stall setup",
  "Close-up texture detail",
  "Guest serving interaction",
  "Wellness event ambiance",
  "Bridal shower styling",
  "Evening event glow"
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visual Story"
        title="A gallery designed to help guests picture NÜMA at their event."
        subtitle="Placeholders are intentionally elegant and easy to swap with your real photography from Instagram and future event shoots."
      />
      <section className="section grid grid-cols-2 gap-4 pt-0 md:grid-cols-3">
        {shots.map((item, i) => (
          <figure
            key={item}
            className={`rounded-2xl border border-forest/10 p-4 shadow-soft ${i % 3 === 0 ? "bg-sage/60" : i % 3 === 1 ? "bg-blush/75" : "bg-white/85"}`}
          >
            <div className="texture flex h-56 items-end rounded-xl border border-white/70 bg-gradient-to-b from-transparent to-white/50 p-4">
              <figcaption className="font-serif text-xl text-plum">{item}</figcaption>
            </div>
          </figure>
        ))}
      </section>
    </>
  );
}
