import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { inquiryUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | NÜMA Açaí"
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We’d love to hear about your upcoming event."
        subtitle="For custom quotes and availability, please start with our inquiry form. For general questions, contact us directly or send a message on Instagram."
      />
      <section className="section grid gap-5 pt-0 md:grid-cols-2">
        <div className="card">
          <p className="text-xs uppercase tracking-[0.2em] text-forest/60">Email</p>
          <a href="mailto:hello@numaacai.com" className="mt-3 block font-serif text-3xl hover:text-berry">
            hello@numaacai.com
          </a>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-forest/60">Instagram</p>
          <a href="https://www.instagram.com/numa.acai/" target="_blank" rel="noreferrer" className="mt-3 block text-lg hover:text-berry">
            @numa.acai
          </a>
        </div>
        <div className="card">
          <h2 className="font-serif text-3xl">Ready for a custom quote?</h2>
          <p className="mt-4 text-sm text-forest/75">Share your date, location, and event details and we’ll guide you through a smooth booking process.</p>
          <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6">Inquire to Book</a>
        </div>
      </section>
    </>
  );
}
