import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { INDUSTRIES, PROJECTS, TESTIMONIALS, type IndustrySlug } from "@/lib/site/data";
import { ProjectCard } from "@/routes/index";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRIES.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.industry.name} — Waldrop Construction` },
      { name: "description", content: loaderData?.industry.description },
      { property: "og:image", content: loaderData?.industry.image },
    ],
  }),
  component: IndustryPage,
  notFoundComponent: () => <div className="container-x py-32 text-center">Industry not found.</div>,
  errorComponent: ({ error }) => <div className="container-x py-32 text-center">{error.message}</div>,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const slug = industry.slug as IndustrySlug;
  const projects = PROJECTS.filter((p) => p.industry === slug);
  const expertise = [
    "Phased construction inside operating facilities",
    "Local subcontractor network across Texas",
    "Self-perform concrete and earthwork",
    "Dedicated superintendent and PM on every project",
  ];
  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink-foreground)]">
        <img src={industry.image} alt={industry.name} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />
        <div className="relative container-x h-full flex flex-col justify-end pb-12">
          <div className="eyebrow text-brand">Industry</div>
          <h1 className="mt-2 text-5xl md:text-7xl">{industry.name}</h1>
        </div>
      </section>

      <section className="container-x py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="eyebrow">Overview</div>
          <h2 className="mt-2 text-4xl">Built for owners who can't pause operations.</h2>
          <p className="mt-5 text-muted-foreground">{industry.description}</p>
          <p className="mt-3 text-muted-foreground">Waldrop delivers turnkey {industry.short.toLowerCase()} projects from preconstruction through closeout — coordinating trades, schedule and quality so your team can stay focused on your mission.</p>
        </div>
        <div>
          <div className="eyebrow">Industry Expertise</div>
          <ul className="mt-4 space-y-3">
            {expertise.map((e) => (
              <li key={e} className="flex items-start gap-3 border-l-2 border-brand pl-4 text-sm">{e}</li>
            ))}
          </ul>
          <div className="mt-8 rounded-sm bg-muted/40 border border-border p-5">
            <div className="eyebrow">Construction Approach</div>
            <p className="text-sm mt-2 text-muted-foreground">Preconstruction → Trade buyout → Phased build → QC & inspections → Owner training & closeout.</p>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="bg-muted/40 border-y border-border py-16">
          <div className="container-x">
            <div className="eyebrow">Relevant Projects</div>
            <h2 className="mt-2 text-4xl">Selected {industry.short.toLowerCase()} work</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-16">
        <figure className="rounded-sm border border-border bg-card p-8 max-w-3xl">
          <div className="font-display text-5xl text-brand leading-none">"</div>
          <blockquote className="mt-3 text-xl font-medium">{TESTIMONIALS[0].quote}</blockquote>
          <figcaption className="mt-5 text-sm">
            <div className="font-semibold">{TESTIMONIALS[0].author}</div>
            <div className="text-muted-foreground">{TESTIMONIALS[0].role}</div>
          </figcaption>
        </figure>
      </section>

      <section className="container-x pb-20">
        <div className="rounded-sm bg-brand text-brand-foreground p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl">Start your {industry.short.toLowerCase()} project.</h2>
            <p className="mt-2 text-sm opacity-90">Get a no-cost preconstruction conversation with our team.</p>
          </div>
          <Link to="/contact" className="rounded-sm bg-[var(--color-ink)] text-[var(--color-ink-foreground)] px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">Request a Bid <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
