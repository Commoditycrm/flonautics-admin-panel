"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
  loading?: boolean;
  index?: number;
}

const StatCard = ({ label, value, icon, loading, index = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-pop)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-[15px] text-brand">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        {loading ? (
          <span className="inline-block h-7 w-16 animate-pulse rounded bg-[#ececef]" />
        ) : typeof value === "number" ? (
          <AnimatedNumber value={value} />
        ) : (
          value
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
