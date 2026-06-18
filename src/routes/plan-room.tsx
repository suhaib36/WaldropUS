import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, Check, FileText, Search, Lock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/plan-room")({
  head: () => ({
    meta: [
      { title: "Plan Room — Waldrop Construction Trade Partners" },
      { name: "description", content: "Subcontractor portal: current bid opportunities, project documents, and trade partner registration." },
    ],
  }),
  component: PlanRoom,
});

const BIDS = [
  { name: "Lingleville ISD Field House", due: "Dec 18, 2026", estimator: "K. Daniels", status: "Open", scope: "Concrete · Steel · MEP · Finishes" },
  { name: "Brownwood Industrial Phase II", due: "Dec 22, 2026", estimator: "M. Waldrop", status: "Open", scope: "Earthwork · Tilt-wall · Roofing" },
  { name: "Kerrville Hotel Renovation", due: "Jan 09, 2027", estimator: "C. Waldrop", status: "Open", scope: "Demo · Drywall · Flooring · Casework" },
  { name: "Abilene Tenant Build-Out", due: "Jan 15, 2027", estimator: "K. Daniels", status: "Upcoming", scope: "MEP · Finishes · Ceilings" },
  { name: "First Baptist Sanctuary", due: "Jan 28, 2027", estimator: "M. Waldrop", status: "Open", scope: "Millwork · A/V · Acoustics" },
];

const STEPS = ["Company", "Business", "Certifications", "Trades", "Review"];
const TRADE_GROUPS: Record<string, string[]> = {
  Sitework: ["Earthwork", "Asphalt", "Concrete", "Landscaping", "Demolition"],
  Structure: ["Steel", "Tilt-Wall", "Masonry", "Carpentry", "Roofing"],
  Envelope: ["Glass & Glazing", "Doors & Frames", "Insulation", "Stucco"],
  Interiors: ["Drywall", "Flooring", "Paint", "Acoustical Ceilings", "Casework"],
  MEP: ["Plumbing", "Mechanical/HVAC", "Electrical", "Fire Protection", "Low-Voltage"],
};

function PlanRoom() {
  return (
    <>
      <section className="container-x pt-16 pb-10">
        <div className="eyebrow">Trade Partners</div>
        <h1 className="mt-2 text-5xl md:text-6xl max-w-3xl">The <span className="text-brand">Plan Room.</span></h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">Current bid opportunities, project documents, and registration for subcontractors and trade partners.</p>
      </section>

      <section className="container-x pb-10 grid md:grid-cols-2 gap-4">
        <LoginCard />
        <BenefitsCard />
      </section>

      <BidBoard />
      <Registration />
    </>
  );
}

function LoginCard() {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-brand" /><div className="eyebrow">Plan Room Login</div></div>
      <h2 className="mt-2 text-2xl">Member access</h2>
      <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm" placeholder="Email" />
        <input type="password" className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm" placeholder="Password" />
        <button className="w-full rounded-sm bg-[var(--color-ink)] text-[var(--color-ink-foreground)] py-2.5 text-sm font-semibold">Sign in</button>
      </form>
    </div>
  );
}

function BenefitsCard() {
  return (
    <div className="rounded-sm border border-border bg-[var(--color-ink)] text-[var(--color-ink-foreground)] p-6">
      <div className="eyebrow text-brand">Why register</div>
      <h2 className="mt-2 text-2xl">Built for subcontractors.</h2>
      <ul className="mt-5 space-y-2.5 text-sm text-white/85">
        {["Access to current bid opportunities", "Direct bid invitations", "Full project documents", "Stay informed about upcoming work"].map((b) => (
          <li key={b} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-brand shrink-0" />{b}</li>
        ))}
      </ul>
      <a href="#register" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">Register now <ArrowRight className="h-4 w-4" /></a>
    </div>
  );
}

function BidBoard() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "Open" | "Upcoming">("all");
  const items = BIDS.filter((b) => (status === "all" || b.status === status) && (q ? b.name.toLowerCase().includes(q.toLowerCase()) : true));
  return (
    <section className="container-x pb-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div><div className="eyebrow">Current Opportunities</div><h2 className="mt-2 text-3xl">Bid board</h2></div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…"
              className="rounded-sm border border-border bg-background pl-9 pr-3 py-2 text-sm" />
          </div>
          {(["all", "Open", "Upcoming"] as const).map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-sm border ${status === s ? "bg-brand text-brand-foreground border-brand" : "border-border"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="rounded-sm border border-border overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.4fr_1fr_1fr_120px_60px] gap-4 px-5 py-3 bg-muted/50 text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
          <div>Project</div><div>Scope</div><div>Estimator</div><div>Bid Due</div><div></div>
        </div>
        {items.map((b) => (
          <div key={b.name} className="grid md:grid-cols-[1.4fr_1fr_1fr_120px_60px] gap-4 px-5 py-4 border-t border-border items-center hover:bg-muted/30 transition cursor-pointer">
            <div>
              <div className="font-semibold">{b.name}</div>
              <div className="md:hidden text-xs text-muted-foreground mt-1">{b.scope}</div>
              <span className={`mt-1 inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm ${b.status === "Open" ? "bg-brand/15 text-brand" : "bg-muted text-muted-foreground"}`}>{b.status}</span>
            </div>
            <div className="hidden md:block text-sm text-muted-foreground">{b.scope}</div>
            <div className="hidden md:block text-sm">{b.estimator}</div>
            <div className="text-sm flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-brand" />{b.due}</div>
            <div className="text-right"><FileText className="inline h-4 w-4 text-muted-foreground" /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Registration() {
  const [step, setStep] = useState(0);
  const [trades, setTrades] = useState<Set<string>>(new Set());
  const [tradeQ, setTradeQ] = useState("");
  const toggle = (t: string) => setTrades((s) => { const n = new Set(s); n.has(t) ? n.delete(t) : n.add(t); return n; });

  return (
    <section id="register" className="bg-muted/40 border-y border-border py-16">
      <div className="container-x">
        <div className="eyebrow">Registration</div>
        <h2 className="mt-2 text-4xl">Become a trade partner.</h2>
        <p className="mt-2 text-muted-foreground max-w-xl">Five quick steps. Save your trade profile once and apply to every bid.</p>

        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 shrink-0">
              <button onClick={() => setStep(i)} className={`flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-semibold ${i === step ? "bg-[var(--color-ink)] text-[var(--color-ink-foreground)]" : i < step ? "bg-brand/15 text-brand" : "border border-border text-muted-foreground"}`}>
                <span className="font-mono">0{i + 1}</span>{s}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-sm border border-border bg-background p-6 md:p-8 min-h-[320px]">
          {step === 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Company name" />
              <Field label="DBA (optional)" />
              <Field label="Year founded" />
              <Field label="Website" />
              <Field label="Primary contact" />
              <Field label="Email" />
            </div>
          )}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="EIN / Tax ID" />
              <Field label="Annual revenue range" />
              <Field label="Bonding capacity" />
              <Field label="Years in commercial construction" />
              <Field label="Service area (counties)" wide />
            </div>
          )}
          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-3">
              {["General Liability", "Workers Compensation", "Auto Liability", "Bondable", "OSHA 30", "M/WBE Certified"].map((c) => (
                <label key={c} className="flex items-center gap-3 rounded-sm border border-border p-3 cursor-pointer hover:border-brand">
                  <input type="checkbox" className="accent-[var(--color-brand)]" /><span className="text-sm font-medium">{c}</span>
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={tradeQ} onChange={(e) => setTradeQ(e.target.value)} placeholder="Search trades…"
                  className="w-full rounded-sm border border-border bg-background pl-9 pr-3 py-2.5 text-sm" />
              </div>
              <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(TRADE_GROUPS).map(([group, list]) => {
                  const filtered = list.filter((t) => t.toLowerCase().includes(tradeQ.toLowerCase()));
                  if (!filtered.length) return null;
                  return (
                    <div key={group}>
                      <div className="eyebrow">{group}</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {filtered.map((t) => (
                          <button key={t} onClick={() => toggle(t)}
                            className={`text-xs px-2.5 py-1.5 rounded-sm border ${trades.has(t) ? "bg-brand text-brand-foreground border-brand" : "border-border hover:border-brand"}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 text-sm text-muted-foreground">{trades.size} trade{trades.size === 1 ? "" : "s"} selected</div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="text-2xl">Review & submit</h3>
              <p className="mt-2 text-sm text-muted-foreground">By submitting you confirm the information is accurate and authorize Waldrop Construction to verify credentials.</p>
              <ul className="mt-5 space-y-1 text-sm">
                <li>· Company profile complete</li>
                <li>· Business details complete</li>
                <li>· Certifications uploaded</li>
                <li>· {trades.size} trade{trades.size === 1 ? "" : "s"} selected</li>
              </ul>
              <button className="mt-6 rounded-sm bg-brand text-brand-foreground px-6 py-3 text-sm font-semibold">Submit registration</button>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-sm border border-border px-4 py-2 text-sm font-semibold" disabled={step === 0}>Back</button>
          <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} className="rounded-sm bg-[var(--color-ink)] text-[var(--color-ink-foreground)] px-4 py-2 text-sm font-semibold" disabled={step === STEPS.length - 1}>Continue</button>
        </div>
      </div>
    </section>
  );
}

function Field({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
      <input className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm focus:border-brand outline-none" />
    </label>
  );
}
