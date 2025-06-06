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
import { AuthProvider } from "../providers/AuthProvider";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
