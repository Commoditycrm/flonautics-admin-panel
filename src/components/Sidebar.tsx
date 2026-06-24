"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BankOutlined,
  LayoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import UserMenu from "./UserMenu";

const NAV = [
  { key: "organizations", label: "Organizations", icon: <BankOutlined /> },
  { key: "templates", label: "Templates", icon: <LayoutOutlined /> },
  { key: "announcements", label: "Announcements", icon: <NotificationOutlined /> },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const active = useMemo(
    () => pathname?.split("/")[1] || "organizations",
    [pathname]
  );

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex h-[60px] items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[15px] font-bold text-white shadow-[0_2px_8px_rgba(91,87,224,0.35)]">
          F
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-ink">
          Flonautics
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-3">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Workspace
        </p>
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const isActive = active === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => router.push(`/${item.key}`)}
                  className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand"
                      : "text-ink-soft hover:bg-[#f4f4f5] hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-lg bg-brand-soft"
                    />
                  )}
                  <span className="text-[17px] leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className="border-t border-border-soft p-3">
        <UserMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
