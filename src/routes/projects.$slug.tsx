import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROJECTS, INDUSTRIES } from "@/lib/site/data";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.name} — Waldrop Construction` },
      { name: "description", content: loaderData?.project.summary },
      { property: "og:image", content: loaderData?.project.image },
    ],
  }),
  component: ProjectPage,
  notFoundComponent: () => <div className="container-x py-32 text-center">Project not found.</div>,
  errorComponent: ({ error }) => <div className="container-x py-32 text-center">{error.message}</div>,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const industry = INDUSTRIES.find((i) => i.slug === project.industry)!;
  return (
    <>
      <section className="relative aspect-[16/8] min-h-[420px] overflow-hidden bg-[var(--color-ink)]">
        <img src={project.image} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-x pb-10 text-[var(--color-ink-foreground)]">
          <div className="eyebrow text-brand">{industry.short} · {project.year}</div>
          <h1 className="mt-2 text-5xl md:text-7xl max-w-4xl">{project.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-white/80"><MapPin className="h-4 w-4" />{project.location}</div>
        </div>
      </section>

      <section className="container-x py-16 grid lg:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-8">
          <div>
            <div className="eyebrow">Overview</div>
            <p className="mt-3 text-lg">{project.summary}</p>
          </div>
          <Block t="Project Scope" d={project.scope} />
          <Block t="Challenge" d={project.challenge} />
          <Block t="Solution" d={project.solution} />
          <Block t="Results" d={project.results} />
        </div>
        <aside className="rounded-sm border border-border bg-card p-6 h-fit sticky top-24">
          <dl className="space-y-4 text-sm">
            <Row k="Location" v={project.location} />
            <Row k="Industry" v={industry.name} />
            <Row k="Completed" v={String(project.year)} />
            <Row k="Delivery" v="Design-Build" />
          </dl>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground w-full justify-center">Discuss a similar project <ArrowRight className="h-4 w-4" /></Link>
        </aside>
      </section>

      <section className="container-x pb-20">
        <div className="eyebrow">Gallery</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {project.gallery.map((g: string, i: number) => (
            <img key={i} src={g} alt="" className="aspect-[4/3] w-full rounded-sm object-cover" />
          ))}
        </div>
      </section>
    </>
  );
}

function Block({ t, d }: { t: string; d: string }) {
  return <div><div className="eyebrow">{t}</div><p className="mt-2 text-muted-foreground">{d}</p></div>;
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold text-right">{v}</dd></div>;
}
