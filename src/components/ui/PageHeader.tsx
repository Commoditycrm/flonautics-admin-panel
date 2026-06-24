"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Small pill shown next to the title, e.g. a live count. */
  badge?: ReactNode;
  /** Right-aligned actions (buttons, filters). */
  actions?: ReactNode;
}

const PageHeader = ({ title, description, badge, actions }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-6 flex flex-wrap items-start justify-between gap-4"
    >
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-[22px] font-semibold tracking-tight text-ink">
            {title}
          </h1>
          {badge}
        </div>
        {description && (
          <p className="mt-1 text-sm text-ink-soft">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
};

export default PageHeader;
