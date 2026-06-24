"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";
import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <div className="flex h-screen overflow-hidden bg-bg">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-[1280px] px-6 py-7">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ApolloProvider>
  );
}
