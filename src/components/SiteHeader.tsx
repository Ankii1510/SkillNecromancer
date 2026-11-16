import Link from "next/link";

export function SiteHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.85rem clamp(1rem, 4vw, 2.5rem)",
        borderBottom: "1px solid rgba(30, 61, 53, 0.15)",
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        background: "rgba(243, 239, 230, 0.92)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(8px)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: '"Iowan Old Style", Palatino, serif',
          fontWeight: 700,
          fontSize: "1.35rem",
          color: "#1e3d35",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        Loom
      </Link>
      <nav style={{ display: "flex", gap: "1.25rem", fontSize: "0.9rem" }}>
        <Link href="/legacy-lift" style={{ color: "#1e3d35" }}>
          LegacyLift
        </Link>
        <Link href="/safe-act" style={{ color: "#1e3d35" }}>
          SafeAct
        </Link>
      </nav>
    </header>
  );
}
