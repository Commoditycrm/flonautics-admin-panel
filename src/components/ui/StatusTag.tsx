import React from "react";

// Status pill with a leading dot — Active when not soft-deleted.
const StatusTag = ({ active }: { active: boolean }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${
        active
          ? "bg-[#e9f7ef] text-[#16794c]"
          : "bg-[#f4f4f5] text-[#71717a]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[#16a34a]" : "bg-[#a1a1aa]"
        }`}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
};

export default StatusTag;
