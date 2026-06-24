"use client";

import React from "react";
import { Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const ErrorState = ({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fdeceb] text-[24px] text-[#e5484d]">
        <WarningOutlined />
      </div>
      <h3 className="text-base font-semibold text-ink">Something went wrong</h3>
      <p className="mt-1 max-w-md text-sm text-ink-soft">
        {message || "We couldn't load this data. Please try again."}
      </p>
      {onRetry && (
        <Button className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
