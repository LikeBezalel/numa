import Link from "next/link";


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
  "Refined station styling that photographs beautifully",
  "Fresh açaí, thoughtful toppings, and intentionally balanced flavors",
  "Smooth guest flow with warm, professional service",
  "Personalized setup details that match your event aesthetic",
  "Custom quote structure based on your exact event needs"
];

export default function HomePage() {
  return (
    <>
      <section className="section grid items-center gap-10 md:grid-cols-[1.08fr_.92fr]">
        <div>
          <p className="eyebrow">Boutique Açaí Event Catering</p>
          <h1 className="h1 mt-4 max-w-2xl text-plum">A sweet, elevated açaí pop-up for unforgettable gatherings.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest/75">
            NÜMA Açaí brings a premium on-site catering experience to weddings, showers, private celebrations, wellness
            events, and brand moments—crafted to feel cozy, refined, and memorable from first glance to final bite.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/inquiry" className="btn-primary">
              Inquire to Book
            </Link>
            <Link href="/gallery" className="btn-secondary">
              View Gallery
            </Link>
          </div>
        </div>
        <div className="texture relative h-[480px] overflow-hidden rounded-[2rem] border border-forest/10 bg-gradient-to-br from-ivory via-blush to-sage p-8 shadow-float">
          <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/70 bg-white/45 p-6 backdrop-blur">
            <p className="font-serif text-4xl text-plum">NÜMA</p>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-gold">Event Experience</p>
              <p className="max-w-xs text-sm text-forest/80">
                Inspired by your logo palette and Instagram mood: soft neutrals, berry tones, botanical warmth, and clean
                premium spacing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="mb-6 flex items-end justify-between gap-3">
          <h2 className="h2 text-plum">For Every Kind of Gathering</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-forest/60">Custom-quoted service</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gatherings.map((item) => (
            <div key={item} className="rounded-xl border border-forest/10 bg-white/80 p-4 text-sm shadow-soft">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section grid gap-6 pt-2 md:grid-cols-2">
        <div>
          <h2 className="h2 text-plum">The Experience</h2>
          <p className="mt-4 text-forest/75">
            NÜMA is designed for hosts who care about details. Every event is tailored around your timeline, setting,
            and guest vibe—so the catering feels like part of your design, not an add-on.
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
          <h2 className="h2 text-plum">Gallery Preview</h2>
          <Link href="/gallery" className="text-sm text-plum underline-offset-4 hover:underline">
            Explore full gallery
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Bowl detail close-up", "Curated stall setup", "Guest moment at service"].map((item) => (
            <div key={item} className="texture h-64 rounded-2xl border border-white/70 bg-gradient-to-br from-white to-sage p-6 shadow-soft">
              <p className="font-serif text-xl text-plum">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="h2 text-plum">Testimonials Preview</h2>
          <Link href="/testimonials" className="text-sm text-plum underline-offset-4 hover:underline">
            Read more
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "The station was gorgeous and our guests kept talking about it all evening.",
            "Everything felt intentional, easy, and beautifully executed."
          ].map((quote, i) => (
            <blockquote key={quote} className="card">
              <p className="font-serif text-xl leading-relaxed text-plum">“{quote}”</p>
              <footer className="mt-4 text-sm text-forest/60">Client {i + 1}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <h2 className="h2 text-plum">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Submit your inquiry",
            "We plan your event experience",
            "We bring NÜMA to your gathering"
          ].map((step, i) => (
            <div key={step} className="card">
              <p className="eyebrow">Step {i + 1}</p>
              <p className="mt-3 font-serif text-2xl text-plum">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="rounded-3xl bg-forest px-8 py-12 text-cream shadow-float">
          <h2 className="font-serif text-3xl md:text-4xl">Ready to bring NÜMA to your event?</h2>
          <p className="mt-4 max-w-2xl text-cream/85">
            Share your date, location, and event style. We’ll follow up with a custom quote designed specifically around
            your gathering.
          </p>
          <Link href="/inquiry" className="btn-secondary mt-8 border-cream/40 bg-cream text-forest">
            Inquire to Book
          </Link>
        </div>
      </section>
    </>
  );
}
