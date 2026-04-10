import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Gallery | NÜMA Açaí"
};

const shots = [
  "Bowl presentation",
  "Styled toppings station",
  "Custom signage",
  "Outdoor event setup",
  "Close-up textures",
  "Guest serving moments",
  "Wellness gathering",
  "Bridal shower details",
  "Evening ambiance"
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visual Story"
        title="A look at the NÜMA atmosphere."
        subtitle="Use these placeholders as a polished framework for your real event photography—ready to swap with brand assets at any time."
      />
      <section className="section grid grid-cols-2 gap-4 pt-0 md:grid-cols-3">
        {shots.map((item, i) => (
          <div key={item} className={`rounded-2xl p-5 shadow-soft ${i % 3 === 0 ? "bg-sage" : i % 3 === 1 ? "bg-blush" : "bg-white"}`}>
            <div className="flex h-56 items-end rounded-xl border border-white/70 bg-gradient-to-b from-transparent to-white/50 p-4">
              <p className="font-serif text-xl">{item}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
