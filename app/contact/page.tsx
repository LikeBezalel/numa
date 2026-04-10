import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { instagramUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your event and we’ll take it from there."
        subtitle="For custom quotes and availability, start with our inquiry form. For general questions, contact us directly or connect on Instagram."
      />
      <section className="section grid gap-5 pt-0 md:grid-cols-2">
        <div className="card">
          <p className="eyebrow">Email</p>
          <a href="mailto:hello@numaacai.com" className="mt-3 block font-serif text-3xl text-plum hover:text-berry">
            hello@numaacai.com
          </a>
          <p className="eyebrow mt-6">Instagram</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-3 block text-lg hover:text-plum">
            @numa.acai
          </a>
        </div>
        <div className="card">
          <h2 className="font-serif text-3xl text-plum">Need a custom quote?</h2>
          <p className="mt-4 text-sm text-forest/75">
            Share your date, location, and event details and we’ll guide you through a polished, easy booking process.
          </p>
          <Link href="/inquiry" className="btn-primary mt-6">
            Inquire to Book
          </Link>
        </div>
      </section>
    </>
  );
}
