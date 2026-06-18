import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { PROJECTS, SERVICES, INDUSTRIES } from "@/lib/site/data";

type Msg = { role: "user" | "ai"; text: string; cards?: { name: string; meta: string; href: string }[] };

const SUGGESTIONS = [
  "Have you built schools?",
  "Show me church projects.",
  "How do I register as a subcontractor?",
  "What projects are currently bidding?",
  "What services do you offer?",
];

function answer(q: string): Msg {
  const s = q.toLowerCase();
  if (/(school|education|isd|campus)/.test(s)) {
    const items = PROJECTS.filter((p) => p.industry === "education");
    return { role: "ai", text: `Yes — Waldrop has delivered education projects across Texas for over five decades. Here are ${items.length} recent examples:`,
      cards: items.map((p) => ({ name: p.name, meta: `${p.location} · ${p.year}`, href: `/projects/${p.slug}` })) };
  }
  if (/(church|chapel|religious|worship)/.test(s)) {
    const items = PROJECTS.filter((p) => p.industry === "churches");
    return { role: "ai", text: items.length ? "Recent church and worship-space work:" : "We've built sanctuaries, chapels and fellowship halls. View industry page for full portfolio.",
      cards: items.map((p) => ({ name: p.name, meta: p.location, href: `/projects/${p.slug}` })) };
  }
  if (/(industrial|warehouse|manufactur)/.test(s)) {
    const items = PROJECTS.filter((p) => p.industry === "industrial");
    return { role: "ai", text: "Industrial work — distribution, warehousing and processing:", cards: items.map((p) => ({ name: p.name, meta: p.location, href: `/projects/${p.slug}` })) };
  }
  if (/(subcontract|register|trade partner|plan room)/.test(s)) {
    return { role: "ai", text: "Register as a trade partner in the Plan Room. The 5-step intake covers company info, business details, certifications, trades, and review.",
      cards: [{ name: "Open the Plan Room", meta: "Register · Login · Bid documents", href: "/plan-room" }] };
  }
  if (/(bid|opportunit|current project)/.test(s)) {
    return { role: "ai", text: "Current bid opportunities are listed in the Plan Room with due dates and estimators.",
      cards: [{ name: "Current Bid Opportunities", meta: "Live bids · Documents · Schedule", href: "/plan-room" }] };
  }
  if (/(service|preconstruction|design.?build|construction management)/.test(s)) {
    return { role: "ai", text: "We deliver three primary services plus self-perform trades:",
      cards: SERVICES.filter((s) => s.primary).map((s) => ({ name: s.name, meta: s.summary, href: `/services/${s.slug}` })) };
  }
  if (/(industr(y|ies))/.test(s)) {
    return { role: "ai", text: "Six industries we serve:",
      cards: INDUSTRIES.map((i) => ({ name: i.name, meta: i.description, href: `/industries/${i.slug}` })) };
  }
  if (/(office|location|where|address)/.test(s)) {
    return { role: "ai", text: "Headquartered in Texas with regional project offices. Reach out via the Contact page for the office nearest your project.",
      cards: [{ name: "Contact our team", meta: "Estimating · Project inquiries", href: "/contact" }] };
  }
  return { role: "ai", text: "I can help with our projects, services, industries, the Plan Room, and how to work with us. Try one of the suggestions below." };
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi — I'm Waldrop AI. Ask about our projects, services, or how to register as a trade partner." },
  ]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { scroller.current?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [messages, open]);

  const send = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTimeout(() => setMessages((m) => [...m, answer(text)]), 350);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-xl hover:opacity-95 transition">
        <Sparkles className="h-4 w-4" /> Ask Waldrop AI
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 right-0 left-0 sm:left-auto sm:bottom-5 sm:right-5 sm:w-[420px] sm:max-h-[80vh] h-[85vh] sm:h-auto flex flex-col rounded-t-2xl sm:rounded-xl border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-sm bg-brand text-brand-foreground"><Sparkles className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-semibold">Waldrop AI</div>
                  <div className="text-[11px] text-muted-foreground">Project finder · Trade partner help</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-sm hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div ref={scroller} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-[var(--color-ink)] text-[var(--color-ink-foreground)]" : "bg-muted text-foreground"}`}>
                    {m.text}
                    {m.cards && (
                      <div className="mt-2 space-y-1.5">
                        {m.cards.map((c) => (
                          <a key={c.href} href={c.href} className="block rounded-md border border-border bg-background p-2 hover:border-brand transition">
                            <div className="text-xs font-semibold">{c.name}</div>
                            <div className="text-[11px] text-muted-foreground line-clamp-1">{c.meta}</div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SUGGESTIONS.slice(0, 3).map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-[11px] rounded-full border border-border px-2.5 py-1 hover:bg-muted">{s}</button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…"
                  className="flex-1 rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand" />
                <button className="grid h-9 w-9 place-items-center rounded-sm bg-brand text-brand-foreground"><Send className="h-4 w-4" /></button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
