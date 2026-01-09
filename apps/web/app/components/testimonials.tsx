"use client";

interface Testimonial {
  body: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
}

const TESTIMONIALS: Testimonial[] = [
  {
    body: "We cut our development time in half. The boilerplate handled all the boring stuff so we could focus on our unique features.",
    author: {
      name: "Sarah Chen",
      role: "CTO at TechStartup",
    },
  },
  {
    body: "Finally, a mobile app starter that doesn't feel like it was built five years ago. Modern stack, modern patterns.",
    author: {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
    },
  },
  {
    body: "The sync between web and mobile just works. Our users can't tell where one ends and the other begins.",
    author: {
      name: "Emily Park",
      role: "Product Manager",
    },
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-title font-bold tracking-tight sm:font-large-title">
            Loved by builders
          </h2>
          <p className="mt-4 font-body text-foreground/60 max-w-lg mx-auto">
            Join thousands of developers who ship faster with our boilerplate.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={index}
              className="relative rounded-2xl border border-border bg-foreground/[0.02] p-6"
            >
              {/* Quote mark */}
              <svg
                className="absolute top-6 right-6 size-8 text-foreground/5"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <blockquote className="relative">
                <p className="font-callout text-foreground/80 leading-relaxed">
                  "{testimonial.body}"
                </p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="size-10 rounded-full bg-foreground/10 flex items-center justify-center border border-border">
                  <span className="font-footnote font-semibold text-foreground/60">
                    {testimonial.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-footnote font-semibold">
                    {testimonial.author.name}
                  </div>
                  <div className="font-caption text-foreground/50">
                    {testimonial.author.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
