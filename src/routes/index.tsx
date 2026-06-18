import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Building2, HardHat, Ruler, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { IMG, INDUSTRIES, PROJECTS, SERVICES, STATS, TAGLINES, TESTIMONIALS, type IndustrySlug } from "@/lib/site/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waldrop Construction — Building Relationships Across Texas Since 1946" },
      { name: "description", content: "Texas commercial construction for education, industrial, churches, hospitality, retail and tenant build-outs. Design-build, CM, and preconstruction." },
    ],
  }),
  component: Home,
});

const HERO_SLIDES = [
  { src: IMG.chapel, label: "Howard Payne University", kicker: "Education / Restoration" },
  { src: IMG.construction, label: "Distribution Center", kicker: "Industrial / Tilt-Wall" },
  { src: IMG.pavilion, label: "Civic Welcome Pavilion", kicker: "Commercial / Civic" },
  { src: IMG.middleSchool, label: "Early Middle School", kicker: "Education / New Campus" },
  { src: IMG.campus, label: "Hill Country Hotel", kicker: "Hospitality" },
  { src: IMG.planReview, label: "On every jobsite, every day", kicker: "Our People" },
];

function Home() {
  return (
    <>
      <Hero />
      <TaglineMarquee />
      <Industries />
      <FeaturedProjects />
      <Services />
      <WhyWaldrop />
      <TexasMap />
      <Testimonials />
      <TradePortal />
      <AIBlock />
      <ContactCTA />
    </>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => {
        setPrev(i);
        return (i + 1) % HERO_SLIDES.length;
      });
    }, 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[640px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink-foreground)]">
      {/* Image stack — no fades. Active slide sits on top with Ken Burns. New slide slides up from below to replace it. */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((h, i) => {
          const isActive = i === idx;
          const isPrev = i === prev && prev !== idx;
          return (
            <div
              key={i}
              className="absolute inset-0 will-change-transform"
              style={{
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                transform: isActive ? "translateY(0)" : isPrev ? "translateY(0)" : "translateY(100%)",
                transition: isActive ? "transform 1100ms cubic-bezier(0.77, 0, 0.175, 1)" : "none",
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={h.src}
                  alt={h.label}
                  className="h-full w-full object-cover"
                  style={{
                    animation: isActive ? "hero-kenburns 6s ease-out forwards" : undefined,
                    transformOrigin: "center",
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/95 via-[var(--color-ink)]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Vertical rule + slide counter */}
      <div className="absolute left-5 md:left-8 top-0 bottom-0 z-10 flex flex-col items-center justify-between py-8 text-white/60">
        <div className="text-[10px] font-mono tracking-widest rotate-180" style={{ writingMode: "vertical-rl" }}>SCROLL · DISCOVER</div>
        <div className="font-display text-2xl font-black text-brand">{String(idx + 1).padStart(2, "0")}<span className="text-white/40 text-sm">/{String(HERO_SLIDES.length).padStart(2, "0")}</span></div>
      </div>

      <div className="relative container-x h-full flex flex-col justify-end pb-16 md:pb-20 pl-14 md:pl-20">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-brand font-semibold">
          <span className="h-px w-10 bg-brand" /> {HERO_SLIDES[idx].kicker}
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
          Building relationships <br className="hidden md:block" /> with folks all over Texas <br className="hidden md:block" /> <span className="text-brand italic font-display">since 1946.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm md:text-base text-white/75">
          Family-owned commercial construction for schools, churches, industrial, hospitality and main-street Texas — delivered by people who answer the phone.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-sm bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground hover:opacity-95 transition">
            Request a Bid <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition backdrop-blur">
            View Projects
          </Link>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/60 max-w-[14ch] leading-relaxed">
            Now featured — <span className="text-white/90">{HERO_SLIDES[idx].label}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => { setPrev(idx); setIdx(i); }}
                aria-label={`Slide ${i + 1}`}
                className={`h-[3px] transition-all duration-500 ${i === idx ? "bg-brand w-12" : "bg-white/30 w-6 hover:bg-white/60"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TaglineMarquee() {
  const items = [TAGLINES.performance, "75+ Years Texas-Built", "Family-Owned · Family-Run", "Design-Build · CM · Preconstruction", "Texas-Sized Capability", "OSHA 30 Certified Field"];
  const loop = [...items, ...items];
  return (
    <section className="border-y border-border bg-[var(--color-ink)] text-[var(--color-ink-foreground)] overflow-hidden">
      <div className="flex whitespace-nowrap py-4 will-change-transform" style={{ animation: "marquee-x 40s linear infinite" }}>
        {loop.map((t, i) => (
          <div key={i} className="flex items-center gap-8 px-8 text-sm font-display font-bold tracking-[0.15em] uppercase">
            <span className={i % 2 === 0 ? "text-brand" : "text-white/85"}>{t}</span>
            <span className="text-white/30">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}


function TrustBar() {
  const items = ["75+ Years Experience", "Commercial Construction Experts", "Texas-Based Contractor", "Design-Build Specialists", "Construction Management"];
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {items.map((i) => <span key={i} className="font-semibold">{i}</span>)}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
      <div className="max-w-2xl">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-2 text-3xl md:text-5xl">{title}</h2>
      </div>
      {kicker && <p className="text-sm text-muted-foreground max-w-md">{kicker}</p>}
    </div>
  );
}

function Industries() {
  return (
    <section className="container-x py-20">
      <SectionHead eyebrow="01 · Industries" title="Industries we build for"
        kicker="Six industries, one delivery standard. Every project supervised by a Texas-based superintendent." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INDUSTRIES.map((i, idx) => (
          <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
            <img src={i.image} alt={i.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/95 via-[var(--color-ink)]/30 to-transparent" />
            <div className="absolute top-4 left-4 text-xs font-mono text-white/70">0{idx + 1}</div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="text-xs uppercase tracking-widest text-brand">{i.short}</div>
              <h3 className="mt-1 text-2xl">{i.name}</h3>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{i.description}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">Learn more <ArrowUpRight className="h-4 w-4" /></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const [filter, setFilter] = useState<IndustrySlug | "all">("all");
  const items = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.industry === filter);
  return (
    <section className="bg-muted/40 border-y border-border py-20">
      <div className="container-x">
        <SectionHead eyebrow="02 · Featured Projects" title="Selected work across Texas" />
        <div className="flex flex-wrap gap-2 mb-8">
          {(["all", ...INDUSTRIES.map((i) => i.slug)] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-sm border transition ${filter === f ? "bg-[var(--color-ink)] text-[var(--color-ink-foreground)] border-[var(--color-ink)]" : "border-border hover:border-brand hover:text-brand"}`}>
              {f === "all" ? "All Projects" : INDUSTRIES.find((i) => i.slug === f)?.short}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-6 py-3 text-sm font-semibold hover:border-brand hover:text-brand transition">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ p }: { p: typeof PROJECTS[number] }) {
  return (
    <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3 rounded-sm bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest">{INDUSTRIES.find((i) => i.slug === p.industry)?.short}</div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.location}</span>
          <span>{p.year}</span>
        </div>
        <h3 className="mt-1 text-xl group-hover:text-brand transition-colors">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.summary}</p>
      </div>
    </Link>
  );
}

function Services() {
  const primary = SERVICES.filter((s) => s.primary);
  const secondary = SERVICES.filter((s) => !s.primary);
  const icons = [Ruler, HardHat, Building2];
  return (
    <section className="container-x py-20">
      <SectionHead eyebrow="03 · Services" title="How we build" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {primary.map((s, i) => {
          const Icon = icons[i];
          return (
            <Link to="/services/$slug" params={{ slug: s.slug }} key={s.slug}
              className="group flex flex-col rounded-sm border border-border bg-card p-6 hover:border-brand transition">
              <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
              <Icon className="mt-3 h-7 w-7 text-brand" />
              <h3 className="mt-4 text-2xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{s.summary}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">Learn more <ArrowUpRight className="h-4 w-4" /></div>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {secondary.map((s) => (
          <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
            className="flex items-center justify-between rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm font-semibold hover:border-brand hover:text-brand transition">
            {s.name}<ArrowUpRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhyWaldrop() {
  const cards = [
    { t: "Trust", d: "Seven decades of long-term relationships and earned client trust." },
    { t: "The Right People", d: "Experienced teams delivering leadership and creativity on every project." },
    { t: "The Right Size", d: "Large-company capability with small-company responsiveness." },
    { t: "The Right Expertise", d: "Diverse experience across commercial construction sectors." },
  ];
  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-ink-foreground)] py-20">
      <div className="container-x">
        <SectionHead eyebrow="04 · Why Waldrop" title="Built on four commitments." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
          {cards.map((c, i) => (
            <div key={c.t} className="bg-[var(--color-ink)] p-7">
              <div className="text-xs font-mono text-brand">0{i + 1}</div>
              <h3 className="mt-3 text-2xl">{c.t}</h3>
              <p className="mt-2 text-sm text-white/70">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl font-black text-brand">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TexasMap() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<IndustrySlug | "all">("all");
  const items = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.industry === filter);
  return (
    <section className="container-x py-20">
      <SectionHead eyebrow="05 · Where we build" title="Projects across Texas" />
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", ...INDUSTRIES.map((i) => i.slug)] as const).map((f) => (
          <button key={f} onClick={() => { setFilter(f); setActive(null); }}
            className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border ${filter === f ? "bg-brand text-brand-foreground border-brand" : "border-border hover:border-brand"}`}>
            {f === "all" ? "All" : INDUSTRIES.find((i) => i.slug === f)?.short}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="relative aspect-[4/3] rounded-sm border border-border bg-muted/30 blueprint-grid overflow-hidden">
          {/* Texas silhouette */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-6 text-foreground/15" preserveAspectRatio="none">
            <path d="M15,30 L25,28 L30,18 L48,18 L52,22 L70,22 L72,28 L82,30 L85,40 L82,55 L78,68 L70,78 L62,88 L52,90 L46,86 L42,90 L34,82 L24,72 L18,60 Z" fill="currentColor" />
          </svg>
          <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">TX · Project Map</div>
          {items.map((p) => (
            <button key={p.slug} onClick={() => setActive(p.slug)}
              style={{ left: `${p.map.x}%`, top: `${p.map.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group">
              <span className={`absolute inset-0 -m-3 rounded-full ${active === p.slug ? "bg-brand/30 animate-ping" : ""}`} />
              <span className={`relative block h-3 w-3 rounded-full ring-2 ring-background ${active === p.slug ? "bg-brand" : "bg-foreground"}`} />
            </button>
          ))}
        </div>
        <div className="rounded-sm border border-border bg-card p-6">
          {active ? (() => {
            const p = PROJECTS.find((x) => x.slug === active)!;
            return (
              <div>
                <img src={p.image} alt={p.name} className="aspect-video w-full rounded-sm object-cover" />
                <div className="eyebrow mt-4">{INDUSTRIES.find((i) => i.slug === p.industry)?.short}</div>
                <h3 className="mt-1 text-2xl">{p.name}</h3>
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</div>
                <p className="mt-3 text-sm">{p.summary}</p>
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">View project <ArrowRight className="h-4 w-4" /></Link>
              </div>
            );
          })() : (
            <div className="h-full flex flex-col justify-center text-center">
              <div className="eyebrow">Click a marker</div>
              <h3 className="mt-2 text-2xl">{items.length} active locations</h3>
              <p className="mt-2 text-sm text-muted-foreground">Filter by industry and tap a pin to view project details.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-muted/40 border-y border-border py-20">
      <div className="container-x">
        <SectionHead eyebrow="06 · Clients" title="Trusted by owners across Texas." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="rounded-sm border border-border bg-background p-7">
              <div className="font-display text-5xl text-brand leading-none">"</div>
              <blockquote className="mt-3 text-lg font-medium">{t.quote}</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold">{t.author}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradePortal() {
  return (
    <section className="container-x py-20">
      <div className="rounded-sm border border-border overflow-hidden grid lg:grid-cols-2">
        <div className="bg-[var(--color-ink)] text-[var(--color-ink-foreground)] p-10">
          <div className="eyebrow">07 · Trade Partners</div>
          <h2 className="mt-2 text-4xl">Bid more work. Build with Waldrop.</h2>
          <p className="mt-4 text-sm text-white/70 max-w-md">
            Join the Plan Room for current bid opportunities, project documents and direct invitations.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/85">
            <li>· Access to current bid opportunities</li>
            <li>· Receive bid invitations</li>
            <li>· View full project documents</li>
            <li>· Stay informed about upcoming projects</li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/plan-room" className="rounded-sm bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">Plan Room Login</Link>
            <Link to="/plan-room" hash="register" className="rounded-sm border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Register</Link>
          </div>
        </div>
        <div className="relative min-h-[280px]">
          <img src={IMG.construction} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function AIBlock() {
  return (
    <section className="container-x py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
        <div>
          <div className="eyebrow flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> 08 · Waldrop AI</div>
          <h2 className="mt-2 text-4xl md:text-5xl">Need help finding information?</h2>
          <p className="mt-4 text-muted-foreground">
            Ask our AI assistant about projects, services, registration, or current bids. Answers in seconds.
          </p>
        </div>
        <div className="rounded-sm border border-border bg-card p-6 space-y-2">
          {["Have you built schools?", "Show me church projects.", "How do I register as a subcontractor?", "What projects are currently bidding?", "What services do you offer?"].map((q) => (
            <div key={q} className="flex items-center gap-3 rounded-sm border border-border bg-background px-4 py-3 text-sm">
              <ShieldCheck className="h-4 w-4 text-brand shrink-0" /><span className="flex-1">{q}</span>
              <span className="text-xs text-muted-foreground">Ask →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="container-x pt-10 pb-20">
      <div className="rounded-sm bg-brand text-brand-foreground p-10 md:p-14 text-center">
        <h2 className="text-4xl md:text-6xl">Let's build something great together.</h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-sm bg-[var(--color-ink)] text-[var(--color-ink-foreground)] px-6 py-3 text-sm font-semibold">Request a Bid</Link>
          <Link to="/contact" className="rounded-sm border border-current/30 px-6 py-3 text-sm font-semibold hover:bg-black/10">Contact our team</Link>
        </div>
      </div>
    </section>
  );
}
