import "antd/dist/reset.css";
import "../style/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Panel",
    absolute: "Admin Panel",
  },
};

import { ReactNode } from "react";
import { Metadata } from "next";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
