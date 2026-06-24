"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  organizations: "Organizations",
  templates: "Templates",
  announcements: "Announcements",
  projects: "Projects",
};

const Topbar = () => {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const segs = (pathname || "").split("/").filter(Boolean);
    const out: string[] = [];
    for (const s of segs) {
      if (LABELS[s]) out.push(LABELS[s]);
      else if (/^[0-9a-f-]{8,}$/i.test(s)) out.push("Details");
    }
    return out.length ? out : ["Organizations"];
  }, [pathname]);

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur">
      <nav className="flex items-center gap-2 text-sm">
        <span className="font-medium text-muted">Flonautics</span>
        {crumbs.map((c, i) => (
          <React.Fragment key={`${c}-${i}`}>
            <span className="text-muted/60">/</span>
            <span
              className={
                i === crumbs.length - 1
                  ? "font-semibold text-ink"
                  : "font-medium text-muted"
              }
            >
              {c}
            </span>
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
};

export default Topbar;
