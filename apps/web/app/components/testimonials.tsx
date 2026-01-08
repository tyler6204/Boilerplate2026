"use client";

interface Testimonial {
  body: string;
  author: {
    name: string;
    handle: string;
    company: string;
  };
}

const TESTIMONIALS: Testimonial[] = [
  {
    body: "We cut our development time in half. Not because of magic, but because everything just works together. No more glue code.",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      company: "CTO at Raycast",
    },
  },
  {
    body: "Finally, a tool that doesn't try to do everything. It does what it promises, does it well, and gets out of my way.",
    author: {
      name: "Marcus Rodriguez",
      handle: "@mrod",
      company: "Founder at Craft",
    },
  },
  {
    body: "The mobile experience is indistinguishable from native. Our users thought we rebuilt our entire app.",
    author: {
      name: "Emily Park",
      handle: "@emilypark",
      company: "Head of Product at Linear",
    },
  },
  {
    body: "Switched from our homegrown solution. Saved 3 engineers worth of maintenance work. Should have done it years ago.",
    author: {
      name: "James Wilson",
      handle: "@jwilson",
      company: "VP Eng at Notion",
    },
  },
  {
    body: "The sync is actually real-time. Not 'eventually consistent' real-time. Actually instant. It's kind of wild.",
    author: {
      name: "Ana Santos",
      handle: "@anasantos",
      company: "Lead Engineer at Figma",
    },
  },
  {
    body: "Security audit passed on the first try. That's never happened before with a new vendor.",
    author: {
      name: "David Kim",
      handle: "@dkim",
      company: "CISO at Stripe",
    },
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-background-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-footnote font-medium text-brand tracking-wide uppercase">
            Testimonials
          </p>
          <h2 className="mt-2 font-title font-bold tracking-tight sm:text-4xl text-balance">
            Used by teams who ship
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={index}
              className="rounded-2xl bg-background p-6 ring-1 ring-border"
            >
              <blockquote className="text-foreground/80">
                <p className="font-callout leading-7">"{testimonial.body}"</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="size-10 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="font-footnote font-medium text-foreground/60">
                    {testimonial.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-footnote font-semibold">{testimonial.author.name}</div>
                  <div className="font-footnote text-foreground/50">{testimonial.author.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
