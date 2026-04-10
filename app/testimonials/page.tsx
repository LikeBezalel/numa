import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Testimonials"
};

const testimonials = [
  ["The setup was unbelievably beautiful and elevated the entire wedding reception.", "Bride, Dallas"],
  ["Guests loved the flavor and kept taking photos of the station.", "Shower Host"],
  ["Easy process, clear communication, and such a polished event-day execution.", "Corporate Event Coordinator"],
  ["NÜMA brought exactly the cozy premium vibe we wanted for our wellness morning.", "Studio Founder"],
  ["The station looked like decor and the bowls were incredible.", "Private Celebration Client"],
  ["From inquiry to event day, everything felt intentionally cared for.", "Brand Activation Manager"]
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Kind Words"
        title="Trusted by hosts who want details done beautifully."
        subtitle="Use these placeholders now, then replace with real client reviews as your event portfolio grows."
      />
      <section className="section grid gap-4 pt-0 md:grid-cols-2">
        {testimonials.map(([quote, author]) => (
          <blockquote key={quote} className="card">
            <p className="font-serif text-2xl leading-relaxed text-plum">“{quote}”</p>
            <footer className="mt-5 text-sm text-forest/60">{author}</footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
