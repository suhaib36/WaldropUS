import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, PROJECTS } from "@/lib/site/data";
import { ProjectCard } from "@/routes/index";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.name} — Waldrop Construction` },
      { name: "description", content: loaderData?.service.summary },
    ],
  }),
  component: ServicePage,
  notFoundComponent: () => <div className="container-x py-32 text-center">Service not found.</div>,
  errorComponent: ({ error }) => <div className="container-x py-32 text-center">{error.message}</div>,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = PROJECTS.slice(0, 3);
  return (
    <>
      <section className="container-x pt-16 pb-10">
        <div className="eyebrow">Service</div>
        <h1 className="mt-2 text-5xl md:text-7xl max-w-3xl">{service.name}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{service.summary}</p>
      </section>

      <section className="container-x py-10 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow">Benefits</div>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((b: string) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="grid h-5 w-5 shrink-0 mt-0.5 place-items-center rounded-full bg-brand text-brand-foreground"><Check className="h-3 w-3" /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow">Process</div>
          <ol className="mt-4 space-y-3">
            {service.process.map((p: string, i: number) => (
              <li key={p} className="flex items-start gap-3 border-l-2 border-border pl-4 py-1">
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted/40 border-y border-border py-16">
        <div className="container-x">
          <div className="eyebrow">Related Projects</div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="rounded-sm bg-[var(--color-ink)] text-[var(--color-ink-foreground)] p-10 flex flex-wrap justify-between items-center gap-6">
          <h2 className="text-3xl md:text-4xl max-w-xl">Talk to our {service.name.toLowerCase()} team.</h2>
          <Link to="/contact" className="rounded-sm bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground inline-flex items-center gap-2">Request a Bid <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
