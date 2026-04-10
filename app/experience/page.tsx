import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { inquiryUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience | NÜMA Açaí"
};

const sections = [
  { title: "Weddings", text: "From welcome moments to late-night treats, we tailor an elegant açaí service that complements your wedding atmosphere and timeline." },
  { title: "Showers", text: "Bridal and baby showers feel even sweeter with a personalized setup designed around your color palette, guest style, and venue flow." },
  { title: "Private celebrations", text: "Birthdays and milestone events receive a custom quote and service style built around your guest count, space, and hosting vision." },
  { title: "Corporate gatherings", text: "Bring a fresh, elevated break to team events, launches, and appreciation moments with polished branding-friendly presentation." },
  { title: "Wellness / community events", text: "Perfect for yoga gatherings, retreats, and local pop-ups where freshness and intentional hospitality matter most." },
  { title: "Brand events", text: "Designed for activations and curated experiences with a personalized setup that aligns with your brand's tone and audience." }
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="The NÜMA Service"
        title="Custom-crafted experiences, tailored to your event."
        subtitle="We do not offer rigid packages. Every NÜMA booking is personalized with a custom quote based on your gathering, location, setup, and service needs."
      />
      <section className="section grid gap-5 pt-0 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h2 className="font-serif text-3xl">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-forest/75">{section.text}</p>
          </article>
        ))}
      </section>
      <section className="section pt-0">
        <div className="rounded-3xl bg-white/80 p-8 shadow-soft">
          <h3 className="font-serif text-3xl">Let’s design something special for your gathering.</h3>
          <p className="mt-3 max-w-2xl text-forest/75">Share your event details and we’ll send a custom quote designed around your guest experience.</p>
          <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6">Inquire to Book</a>
        </div>
      </section>
    </>
  );
}
