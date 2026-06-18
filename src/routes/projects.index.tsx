import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PROJECTS, INDUSTRIES, type IndustrySlug } from "@/lib/site/data";
import { ProjectCard } from "@/routes/index";
import { Search, MapPin } from "lucide-react";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Waldrop Construction" },
      { name: "description", content: "Education, industrial, church, hospitality, retail and tenant build-out projects across Texas." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<IndustrySlug | "all">("all");
  const items = useMemo(() => PROJECTS.filter((p) => {
    const hit = q ? `${p.name} ${p.location} ${p.summary}`.toLowerCase().includes(q.toLowerCase()) : true;
    const ind = filter === "all" || p.industry === filter;
    return hit && ind;
  }), [q, filter]);

  return (
    <>
      <section className="container-x pt-16 pb-10">
        <div className="eyebrow">Projects</div>
        <h1 className="mt-2 text-5xl md:text-6xl max-w-3xl">Selected work across <span className="text-brand">Texas.</span></h1>
      </section>

      <section className="container-x pb-10">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, locations…"
              className="w-full rounded-sm border border-border bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus:border-brand" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(["all", ...INDUSTRIES.map((i) => i.slug)] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border ${filter === f ? "bg-[var(--color-ink)] text-[var(--color-ink-foreground)] border-[var(--color-ink)]" : "border-border hover:border-brand"}`}>
                {f === "all" ? "All" : INDUSTRIES.find((i) => i.slug === f)?.short}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-20">
        {items.length === 0 ? (
          <div className="rounded-sm border border-border p-12 text-center text-muted-foreground">No projects match your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        )}
      </section>

      <section className="container-x pb-20">
        <div className="rounded-sm border border-border bg-muted/30 p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-brand" /> {items.length} projects shown · interactive map on the homepage</div>
        </div>
      </section>
    </>
  );
}
