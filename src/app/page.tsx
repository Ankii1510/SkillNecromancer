import Link from "next/link";

export default function HomePage() {
  return (
    <main className="loom-home">
      <section className="hero" aria-labelledby="loom-brand">
        <p className="eyebrow">Kiroween 2026 · Skeleton Crew</p>
        <h1 id="loom-brand">Loom</h1>
        <p className="lede">
          Weave AI Skills into LegacyLift and SafeAct—portable contracts for
          modernization and guarded agent action.
        </p>
        <div className="cta-row">
          <Link className="cta primary" href="/legacy-lift">
            Open LegacyLift
          </Link>
          <Link className="cta secondary" href="/safe-act">
            Open SafeAct
          </Link>
        </div>
      </section>

      <section className="surfaces" aria-labelledby="surfaces-heading">
        <h2 id="surfaces-heading">Two threads, one loom</h2>
        <p>
          Skills live once under <code>skills/</code>. Each app pulls the same
          contracts through <code>core/</code>—no fork of truth per demo.
        </p>
        <ul>
          <li>
            <strong>LegacyLift</strong> — guided modernization skills for aging
            codebases.
          </li>
          <li>
            <strong>SafeAct</strong> — explicit rails so agent actions stay
            inside policy.
          </li>
        </ul>
      </section>

      <style>{`
        .loom-home {
          --ink: #1a1612;
          --paper: #f3efe6;
          --thread: #2f5d50;
          --thread-deep: #1e3d35;
          --warp: #c4a35a;
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(ellipse 120% 80% at 10% -10%, #dfe8e4 0%, transparent 55%),
            radial-gradient(ellipse 90% 70% at 100% 0%, #ebe0c8 0%, transparent 50%),
            linear-gradient(165deg, #f7f3ea 0%, #e8e2d4 45%, #d5ddd8 100%);
          font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
        }
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2rem, 6vw, 5rem);
          max-width: 42rem;
        }
        .eyebrow {
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 0.75rem;
          color: var(--thread-deep);
          margin: 0 0 1rem;
          font-family: "Segoe UI", system-ui, sans-serif;
        }
        h1 {
          font-size: clamp(3.5rem, 12vw, 6.5rem);
          line-height: 0.95;
          margin: 0 0 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--thread-deep);
        }
        .lede {
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          line-height: 1.45;
          margin: 0 0 2rem;
          max-width: 28rem;
        }
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
        }
        .cta {
          display: inline-block;
          padding: 0.7rem 1.25rem;
          text-decoration: none;
          font-family: "Segoe UI", system-ui, sans-serif;
          font-size: 0.95rem;
          border: 1px solid var(--thread-deep);
          transition: background 160ms ease, color 160ms ease;
        }
        .cta.primary {
          background: var(--thread);
          color: var(--paper);
          border-color: var(--thread);
        }
        .cta.primary:hover {
          background: var(--thread-deep);
        }
        .cta.secondary {
          color: var(--thread-deep);
          background: transparent;
        }
        .cta.secondary:hover {
          background: rgba(30, 61, 53, 0.08);
        }
        .surfaces {
          padding: clamp(2rem, 6vw, 4rem);
          max-width: 40rem;
          border-top: 1px solid rgba(30, 61, 53, 0.2);
        }
        .surfaces h2 {
          font-size: 1.75rem;
          margin: 0 0 0.75rem;
          color: var(--thread-deep);
        }
        .surfaces p,
        .surfaces li {
          font-family: "Segoe UI", system-ui, sans-serif;
          line-height: 1.5;
        }
        .surfaces ul {
          padding-left: 1.2rem;
        }
        code {
          font-size: 0.9em;
        }
      `}</style>
    </main>
  );
}
