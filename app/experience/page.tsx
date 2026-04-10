import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experience"
};

const sections = [
  {
    title: "Weddings",
    text: "From welcome drinks to late-night sweet moments, we tailor a polished açaí service that complements your floral design, timeline, and guest flow."
  },
  {
    title: "Showers",
    text: "Bridal and baby showers feel even sweeter with a personalized setup designed around your palette, venue layout, and hosting style."
  },
  {
    title: "Private celebrations",
    text: "For birthdays and milestone events, your custom quote is built around guest count, location logistics, and how you want the service to feel."
  },
  {
    title: "Corporate gatherings",
    text: "Elevate team events, client appreciations, and launches with a clean, branded-friendly presentation and seamless service."
  },
  {
    title: "Wellness / community events",
    text: "Perfect for retreats, studios, and community pop-ups where freshness, intention, and visual calm are central to the experience."
  },
  {
    title: "Brand events",
    text: "Built for activations with a personalized setup and service approach that aligns with your brand tone and audience atmosphere."
  }
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="The NÜMA Service"
        title="An event experience designed around your gathering."
        subtitle="NÜMA does not use rigid package pricing. Every booking receives a custom quote tailored to your event type, guest count, location, and setup needs."
      />
      <section className="section grid gap-5 pt-0 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h2 className="font-serif text-3xl text-plum">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-forest/75">{section.text}</p>
          </article>
        ))}
      </section>
      <section className="section pt-0">
        <div className="rounded-3xl bg-white/85 p-8 shadow-soft">
          <h3 className="font-serif text-3xl text-plum">Let’s design a quote for your exact event.</h3>
          <p className="mt-3 max-w-2xl text-forest/75">
            Share your date, location, and event details and we’ll plan a personalized NÜMA experience.
          </p>
          <Link href="/inquiry" className="btn-primary mt-6">
            Inquire to Book
          </Link>
        </div>
      </section>
    </>
  );
}
