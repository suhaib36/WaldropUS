import { Link } from "@tanstack/react-router";
import { IMG, TAGLINES } from "@/lib/site/data";

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--color-ink)] text-[var(--color-ink-foreground)]">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <img src={IMG.logo} alt="Waldrop Construction" className="h-12 w-auto rounded-sm" />
          <p className="mt-5 text-sm text-white/75 max-w-xs italic">
            "{TAGLINES.primary}"
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">{TAGLINES.performance}</p>
        </div>
        <FootCol title="Company" links={[["About", "/about"], ["Careers", "/about#careers"], ["Contact", "/contact"]]} />
        <FootCol title="Build" links={[["Industries", "/industries"], ["Services", "/services"], ["Projects", "/projects"]]} />
        <FootCol title="Trade Partners" links={[["Plan Room", "/plan-room"], ["Register", "/plan-room#register"], ["Bid Opportunities", "/plan-room"]]} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-6 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Waldrop Construction. Texas General Contractor.</div>
          <div className="flex items-center gap-4">
            <span>OSHA 30 Certified</span>·<span>AGC Member</span>·<span>Design-Build Institute</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow text-brand">{title}</div>
      <ul className="mt-4 space-y-2">
        {links.map(([label, to]) => (
          <li key={to}><Link to={to} className="text-sm text-white/80 hover:text-brand transition-colors">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
