import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Loom",
    template: "%s · Loom",
  },
  description:
    "Loom — weave AI Skills into LegacyLift and SafeAct. Kiroween 2026 Skeleton Crew.",
  applicationName: "Loom",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f3efe6",
          color: "#1a1612",
        }}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
