import Link from "next/link";

const links = [
  { href: "/", label: "Skeleton" },
  { href: "/legacy-lift", label: "LegacyLift" },
  { href: "/safe-act", label: "SafeAct" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[var(--line)]/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span
            className="text-xl tracking-tight text-[var(--bone)] md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SkillNecromancer
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:inline">
            Skeleton Crew
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm md:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--ink)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
