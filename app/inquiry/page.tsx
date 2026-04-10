import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { inquiryUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Inquiry | NÜMA Açaí"
};

const whatWeAsk = [
  "Event date",
  "Location",
  "Event type",
  "Estimated guest count",
  "Venue / setting",
  "Special notes or custom details"
];

export default function InquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Inquiry & Booking"
        title="Let’s create a custom quote for your event."
        subtitle="Because each event is unique, pricing is customized based on guest count, location, service style, and event needs."
      />
      <section className="section grid gap-8 pt-0 md:grid-cols-2">
        <div className="card">
          <h2 className="font-serif text-3xl">What We’ll Ask</h2>
          <ul className="mt-5 space-y-3">
            {whatWeAsk.map((item) => (
              <li key={item} className="rounded-xl border border-forest/10 bg-white px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-forest/70">Once submitted, we’ll follow up with a tailored quote and next steps.</p>
          <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6">
            Open Inquiry Form
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-soft">
          <iframe
            src={inquiryUrl}
            title="NÜMA Açaí Inquiry Form"
            className="h-[680px] w-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </>
  );
}
