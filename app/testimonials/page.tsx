import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Testimonials | NÜMA Açaí"
};

const testimonials = [
  ["The setup was absolutely beautiful and matched our wedding aesthetic perfectly.", "Bride, California"],
  ["Guests kept saying it was their favorite part of the shower. So chic and delicious.", "Event Host"],
  ["Professional, warm, and seamless from inquiry to event day.", "Corporate Client"],
  ["NÜMA made our wellness event feel elevated and intentional.", "Studio Founder"],
  ["The bowls were incredible and the station looked like decor on its own.", "Private Party Client"],
  ["Every detail felt personalized. It was the easiest vendor process we had.", "Bridal Shower Host"]
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Kind Words"
        title="Loved for the details, remembered for the experience."
        subtitle="These polished placeholder testimonials highlight the tone and trust signals you can expect once client reviews are added."
      />
      <section className="section grid gap-4 pt-0 md:grid-cols-2">
        {testimonials.map(([quote, author]) => (
          <blockquote key={quote} className="card">
            <p className="font-serif text-2xl leading-relaxed">“{quote}”</p>
            <footer className="mt-5 text-sm text-forest/60">{author}</footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
