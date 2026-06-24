import React from "react";

// Lightweight shimmer placeholder for initial table load.
const TableSkeleton = ({
  rows = 8,
  cols = 6,
}: {
  rows?: number;
  cols?: number;
}) => {
  return (
    <div className="px-4 py-3" aria-hidden>
      <div className="flex gap-4 border-b border-border-soft py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="h-3 flex-1 animate-pulse rounded bg-[#ececef]"
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={`r-${r}`}
          className="flex items-center gap-4 border-b border-border-soft py-4"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={`c-${r}-${c}`}
              className="h-4 flex-1 animate-pulse rounded bg-[#f1f1f4]"
              style={{ animationDelay: `${(r * cols + c) * 25}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
