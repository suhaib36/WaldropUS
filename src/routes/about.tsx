import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG, STATS, TAGLINES } from "@/lib/site/data";
import { ArrowRight, HardHat, Hammer, Compass, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Waldrop Construction — Texas builders since 1946" },
      { name: "description", content: "Family-owned Texas commercial construction since 1946. Our story, our crews, our commitment to relationships and performance." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { y: "1946", t: "Hammer hits nail", d: "Waldrop opens its doors in Texas, building homes and small commercial work in the post-war boom." },
  { y: "1972", t: "Schools & sanctuaries", d: "Focus shifts to commercial work for ISDs and churches across central and west Texas." },
  { y: "1989", t: "Design-Build launched", d: "Single-source delivery added — one team responsible for design through ribbon-cutting." },
  { y: "2004", t: "Crews go self-perform", d: "In-house tilt-wall, concrete and earthwork crews bring schedule and cost under one roof." },
  { y: "2019", t: "Statewide footprint", d: "Active projects from Lubbock to Kerrville — six industries, one delivery standard." },
  { y: "2026", t: "Same handshake", d: "Eighty years on, every bid still starts with a phone call and a site visit." },
];

// Role-only crew board — no personal names per privacy preference.
const CREW = [
  { img: IMG.planReview, role: "Project Manager", trade: "Plan Review" },
  { img: IMG.fieldCrew, role: "Site Superintendent", trade: "Field Operations" },
  { img: IMG.office, role: "Office Manager", trade: "Owner Support" },
  { img: IMG.teamGroup, role: "The Waldrop Crew", trade: "Texas-Based" },
];

function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-ink-foreground)] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.teamGroup} alt="Waldrop crew" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/80 to-[var(--color-ink)]/30" />
        </div>
        <div className="relative container-x py-24 md:py-32">
          <div className="eyebrow">About Waldrop</div>
          <h1 className="mt-3 max-w-4xl text-5xl md:text-7xl leading-[0.95]">
            Eighty years of <span className="text-brand italic font-display">Texas handshakes.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 text-lg">
            "{TAGLINES.primary}"
          </p>
          <div className="mt-8 inline-flex items-center gap-2 nametag px-4 py-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-white/90" /> {TAGLINES.performance}
          </div>
        </div>
      </section>

      {/* STORY — replaced "Third generation" narrative with relationships/community angle */}
      <section className="container-x py-20 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div className="grid grid-cols-6 gap-3">
          <img src={IMG.planReview} alt="On the jobsite" className="col-span-4 aspect-[4/3] w-full rounded-sm object-cover" />
          <img src={IMG.fieldCrew} alt="Field crew" className="col-span-2 aspect-square w-full rounded-sm object-cover" />
          <img src={IMG.office} alt="Office" className="col-span-2 aspect-square w-full rounded-sm object-cover" />
          <img src={IMG.teamGroup} alt="Team" className="col-span-4 aspect-[4/3] w-full rounded-sm object-cover" />
        </div>
        <div>
          <div className="eyebrow">Our story</div>
          <h2 className="mt-2 text-4xl md:text-5xl">A Texas company, built by Texans, for Texans.</h2>
          <p className="mt-5 text-muted-foreground">
            Waldrop has never been a big-city general contractor that drove out for the day. We live in the towns we build in — we send our kids to the schools we frame, sit in the sanctuaries we finish, and shop in the storefronts we open.
          </p>
          <p className="mt-3 text-muted-foreground">
            That's why eighty years in, a Waldrop project still starts the same way: a phone call, a site visit, and a handshake. The contract paperwork follows.
          </p>
          <p className="mt-3 text-muted-foreground">
            Our superintendents have an average of 18 years in the field. Our subcontractor partners come back project after project. And our owners — schools, churches, manufacturers, hoteliers — keep us on speed dial because we answer.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-black text-brand">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-muted/40 border-y border-border py-20">
        <div className="container-x">
          <div className="eyebrow">History</div>
          <h2 className="mt-2 text-4xl md:text-5xl">Built one decade at a time.</h2>
          <div className="mt-12 relative border-l-2 border-brand/30 pl-8 space-y-10 max-w-3xl">
            {TIMELINE.map((t) => (
              <div key={t.y} className="relative">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-brand ring-4 ring-background" />
                <div className="font-display text-3xl font-black text-brand">{t.y}</div>
                <h3 className="mt-1 text-xl">{t.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREW — role-only nametags, no personal names */}
      <section className="container-x py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="eyebrow">The crew</div>
            <h2 className="mt-2 text-4xl md:text-5xl">People you'll actually meet.</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">Project managers, superintendents, office crew. Every Waldrop project is led by a Texas-based team — no out-of-state PMs, no call-center coordination.</p>
          </div>
          <div className="hidden md:block text-xs font-mono uppercase tracking-widest text-muted-foreground">
            // ID-only · Names withheld for privacy
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CREW.map((m, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-sm border border-border bg-card">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.img} alt={m.role} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              {/* Hardhat nametag overlay */}
              <figcaption className="absolute left-3 right-3 bottom-3">
                <div className="nametag rounded-sm px-3 py-2 flex items-center gap-2 shadow-lg">
                  <span className="grid h-6 w-6 place-items-center rounded-[2px] bg-white/95 text-[10px] font-display font-black text-brand">W</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.25em] opacity-80 leading-none">ID · {String(i + 1).padStart(3, "0")}</div>
                    <div className="text-xs font-bold leading-tight truncate">{m.role}</div>
                  </div>
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-widest text-white/80 px-1">{m.trade}</div>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </figure>
          ))}
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="container-x pb-20 grid md:grid-cols-4 gap-4">
        {[
          { I: HardHat, t: "Safety First", d: "OSHA 30 program, weekly toolbox talks, and zero-incident jobsite culture." },
          { I: Hammer, t: "Self-Perform Crews", d: "Concrete, tilt-wall, earthwork — in-house for schedule and cost control." },
          { I: Compass, t: "Texas-Based", d: "Headquartered in Texas with project teams statewide. We live where we build." },
          { I: Users, t: "Relationships", d: "Owners, architects, subcontractors — most of our work comes from referrals." },
        ].map(({ I, t, d }) => (
          <div key={t} className="rounded-sm border border-border p-6 bg-card">
            <I className="h-7 w-7 text-brand" />
            <h3 className="mt-4 text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section id="careers" className="container-x pb-24">
        <div className="rounded-sm border border-border bg-[var(--color-ink)] text-[var(--color-ink-foreground)] p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div className="eyebrow">Careers</div>
            <h2 className="mt-2 text-3xl">Build your career with Waldrop.</h2>
            <p className="mt-2 text-sm text-white/70 max-w-xl">Project managers, superintendents, estimators and field crews. We promote from within.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-sm bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground">View openings <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
