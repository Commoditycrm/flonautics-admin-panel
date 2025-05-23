"use client";

import "antd/dist/reset.css"; // Ant Design v5+ reset styles
import "../style/global.css";

import { ReactNode } from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";

const { Header, Sider, Content } = Layout;

export default function RootLayout({ children }: { children: ReactNode }) {

  

  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body>
          <Layout className="h-[100vh]">
            <Header>
              <Navbar />
            </Header>

            <Layout>
              <Sider width={240}>
                <Sidebar />
              </Sider>

              <Content className="p-[22px]">{children}</Content>
            </Layout>
          </Layout>
        </body>
      </html>
    </ApolloProvider>
  );
}
