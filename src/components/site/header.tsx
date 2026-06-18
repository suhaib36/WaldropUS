import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/site/theme";
import { IMG } from "@/lib/site/data";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/industries", label: "Industries" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/plan-room", label: "Plan Room" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src={IMG.logo} alt="Waldrop Construction" className="h-10 w-auto shrink-0 rounded-sm" />
          <div className="hidden sm:block min-w-0 leading-tight border-l border-border pl-3">
            <div className="font-display text-[11px] font-bold tracking-[0.18em] uppercase text-brand">Est. 1946</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">Texas General Contractor</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-foreground/80 hover:text-brand transition-colors"
              activeProps={{ className: "text-brand" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-sm border border-border hover:bg-muted transition">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 rounded-sm bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition">
            Request a Bid
          </Link>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-sm border border-border">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium border-b border-border last:border-b-0">{n.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
