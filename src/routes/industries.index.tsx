import { createFileRoute, Link } from "@tanstack/react-router";
import { INDUSTRIES } from "@/lib/site/data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — Waldrop Construction" },
      { name: "description", content: "Education, industrial, churches, commercial & retail, tenant build-out, and hotels." },
    ],
  }),
  component: Industries,
});

function Industries() {
  return (
    <>
      <section className="container-x pt-16 pb-10">
        <div className="eyebrow">Industries</div>
        <h1 className="mt-2 text-5xl md:text-6xl max-w-3xl">Six sectors. <span className="text-brand">One delivery standard.</span></h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Every Waldrop project is supervised by a Texas-based superintendent and backed by self-perform crews.
        </p>
      </section>
      <section className="container-x pb-20 grid grid-cols-1 md:grid-cols-2 gap-5">
        {INDUSTRIES.map((i, idx) => (
          <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }}
            className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-border">
            <img src={i.image} alt={i.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent" />
            <div className="absolute top-4 left-4 text-xs font-mono text-white/70">0{idx + 1}</div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="eyebrow text-brand">{i.short}</div>
              <h3 className="mt-1 text-3xl">{i.name}</h3>
              <p className="mt-2 text-sm text-white/80 max-w-md">{i.description}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">View industry <ArrowUpRight className="h-4 w-4" /></div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
