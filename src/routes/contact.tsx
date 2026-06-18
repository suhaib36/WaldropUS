import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Waldrop Construction" },
      { name: "description", content: "Request a bid or contact our preconstruction team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="container-x pt-16 pb-10">
        <div className="eyebrow">Contact</div>
        <h1 className="mt-2 text-5xl md:text-6xl max-w-3xl">Let's build something <span className="text-brand">great together.</span></h1>
        <p className="mt-5 max-w-xl text-muted-foreground">Tell us about your project — type, budget, timeline and location. A preconstruction lead will respond within one business day.</p>
      </section>

      <section className="container-x pb-20 grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-sm border border-border bg-card p-6 md:p-8">
          {sent ? (
            <div className="text-center py-10">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-brand-foreground"><Check className="h-6 w-6" /></div>
              <h2 className="mt-4 text-2xl">Request received.</h2>
              <p className="mt-2 text-sm text-muted-foreground">A Waldrop preconstruction lead will reach out shortly.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" />
              <Field label="Company" />
              <Field label="Email" type="email" />
              <Field label="Phone" />
              <Select label="Project type" options={["Education", "Industrial", "Church", "Commercial", "Tenant Build-Out", "Hotel"]} />
              <Select label="Delivery method" options={["Design-Build", "CM at Risk", "Hard Bid", "Not sure"]} />
              <Field label="Budget range" />
              <Field label="Timeline" />
              <Field label="Project location" wide />
              <label className="md:col-span-2 block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Tell us about your project</span>
                <textarea rows={5} className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm focus:border-brand outline-none" />
              </label>
              <button className="md:col-span-2 rounded-sm bg-brand text-brand-foreground py-3.5 text-sm font-semibold">Submit request</button>
            </div>
          )}
        </form>
        <aside className="space-y-6">
          <InfoCard icon={<Phone className="h-4 w-4" />} title="Call" value="(254) 555-0146" />
          <InfoCard icon={<Mail className="h-4 w-4" />} title="Email" value="estimating@waldropconstruction.com" />
          <InfoCard icon={<MapPin className="h-4 w-4" />} title="Headquarters" value="Texas · Project offices statewide" />
          <div className="rounded-sm border border-border bg-[var(--color-ink)] text-[var(--color-ink-foreground)] p-6">
            <div className="eyebrow text-brand">Hours</div>
            <div className="mt-2 text-sm space-y-1 text-white/85">
              <div>Mon — Fri · 7:00 AM – 6:00 PM</div>
              <div>Emergencies · 24/7 superintendent line</div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ label, wide, type = "text" }: { label: string; wide?: boolean; type?: string }) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
      <input type={type} className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm focus:border-brand outline-none" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
      <select className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm focus:border-brand outline-none">
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-brand">{icon}<div className="eyebrow">{title}</div></div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}
