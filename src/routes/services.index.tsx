import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site/data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Waldrop Construction" },
      { name: "description", content: "Preconstruction, construction management, design-build, concrete, earthwork, paving and metal buildings." },
    ],
  }),
  component: Services,
});

function Services() {
  const primary = SERVICES.filter((s) => s.primary);
  const secondary = SERVICES.filter((s) => !s.primary);
  return (
    <>
      <section className="container-x pt-16 pb-10">
        <div className="eyebrow">Services</div>
        <h1 className="mt-2 text-5xl md:text-6xl max-w-3xl">How we <span className="text-brand">build.</span></h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">From preconstruction through closeout, with self-perform crews for concrete, earthwork and paving.</p>
      </section>

      <section className="container-x pb-12 grid lg:grid-cols-3 gap-5">
        {primary.map((s, i) => (
          <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
            className="group flex flex-col rounded-sm border border-border bg-card p-7 hover:border-brand transition min-h-[280px]">
            <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
            <h2 className="mt-3 text-3xl">{s.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground flex-1">{s.summary}</p>
            <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">Service detail <ArrowUpRight className="h-4 w-4" /></div>
          </Link>
        ))}
      </section>

      <section className="container-x pb-20">
        <div className="eyebrow">Self-perform trades</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {secondary.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
              className="flex items-center justify-between rounded-sm border border-border bg-muted/30 px-5 py-4 hover:border-brand hover:text-brand transition">
              <span className="font-semibold">{s.name}</span><ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
