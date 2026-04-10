import Link from "next/link";
import { inquiryUrl } from "@/data/site";

const gatherings = [
  "Weddings",
  "Bridal showers",
  "Baby showers",
  "Private parties",
  "Corporate events",
  "Wellness events",
  "Community pop-ups",
  "Brand activations"
];

const experiencePoints = [
  "Beautifully styled on-site setup and serving station",
  "Fresh, high-quality ingredients and thoughtful toppings",
  "A guest experience that feels interactive and memorable",
  "Elevated presentation that complements your event design",
  "Service tailored to your flow, vision, and atmosphere"
];

export default function HomePage() {
  return (
    <>
      <section className="section grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-berry">Boutique Event Catering</p>
          <h1 className="h1 mt-4">Premium açaí pop-up experiences for your most meaningful gatherings.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest/75">
            NÜMA Açaí brings a cozy, elevated on-site açaí stall to weddings, showers, private celebrations, brand
            moments, and wellness events—designed to feel as beautiful as it tastes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Inquire to Book
            </a>
            <Link href="/gallery" className="btn-secondary">
              View Gallery
            </Link>
          </div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-sage via-blush to-cream p-8 shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,59,75,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(31,59,47,0.16),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-end rounded-2xl border border-white/60 bg-white/40 p-6 backdrop-blur">
            <p className="font-serif text-3xl">NÜMA Açaí</p>
            <p className="mt-3 text-sm text-forest/75">An on-site experience that guests remember long after the event ends.</p>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <h2 className="h2">For Every Kind of Gathering</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gatherings.map((item) => (
            <div key={item} className="rounded-xl border border-forest/10 bg-white/70 p-4 text-sm shadow-soft">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section grid gap-6 pt-0 md:grid-cols-2">
        <div>
          <h2 className="h2">The Experience</h2>
          <p className="mt-4 text-forest/75">
            Every NÜMA event is designed around your atmosphere. We blend hospitality, styling, and flavor to create a
            premium pop-up that feels personal to your gathering.
          </p>
        </div>
        <ul className="space-y-3">
          {experiencePoints.map((point) => (
            <li key={point} className="card text-sm text-forest/80">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="section pt-0">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="h2">Gallery Preview</h2>
          <Link href="/gallery" className="text-sm text-berry underline-offset-4 hover:underline">
            Explore full gallery
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Bowl details", "Styled stall setup", "Event atmosphere"].map((item) => (
            <div key={item} className="h-64 rounded-2xl bg-gradient-to-br from-white to-sage p-6 shadow-soft">
              <p className="font-serif text-xl">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="h2">Testimonials Preview</h2>
          <Link href="/testimonials" className="text-sm text-berry underline-offset-4 hover:underline">
            Read more
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {["The setup was stunning and our guests were obsessed.", "The process felt easy, polished, and so thoughtful."].map(
            (quote, i) => (
              <blockquote key={quote} className="card">
                <p className="font-serif text-xl leading-relaxed">“{quote}”</p>
                <footer className="mt-4 text-sm text-forest/60">Client {i + 1}</footer>
              </blockquote>
            )
          )}
        </div>
      </section>

      <section className="section pt-0">
        <h2 className="h2">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Submit your inquiry",
            "We plan your event experience",
            "We bring NÜMA to your gathering"
          ].map((step, i) => (
            <div key={step} className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-berry">Step {i + 1}</p>
              <p className="mt-3 font-serif text-2xl">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="rounded-3xl bg-forest px-8 py-12 text-cream shadow-soft">
          <h2 className="font-serif text-3xl md:text-4xl">Ready to bring NÜMA to your event?</h2>
          <p className="mt-4 max-w-2xl text-cream/85">
            Tell us about your date, location, and guest count. We will craft a custom quote tailored to your gathering.
          </p>
          <a href={inquiryUrl} target="_blank" rel="noreferrer" className="btn-secondary mt-8 border-cream/30 bg-white text-forest">
            Inquire to Book
          </a>
        </div>
      </section>
    </>
  );
}
