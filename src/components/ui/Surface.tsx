import React, { ReactNode } from "react";

// Premium card container: white, hairline border, soft shadow.
const Surface = ({
  children,
  className = "",
  padded = false,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) => {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-soft)] ${
        padded ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Surface;
