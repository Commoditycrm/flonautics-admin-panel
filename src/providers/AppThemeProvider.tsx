"use client";

import { ReactNode } from "react";
import { App, ConfigProvider } from "antd";
import { theme } from "@/src/theme/theme";

// Wraps the tree with our AntD theme + App context (for message/notification/modal).
export default function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
