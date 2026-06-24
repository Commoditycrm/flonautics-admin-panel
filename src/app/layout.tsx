import "antd/dist/reset.css";
import "../style/global.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppThemeProvider from "../providers/AppThemeProvider";
import { AuthProvider } from "../providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Flonautics",
    absolute: "Flonautics Admin",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AntdRegistry>
          <AppThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
