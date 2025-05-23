"use client";
import client from "@/apolloClient";
import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";
import { ApolloProvider } from "@apollo/client";
import { Layout } from "antd";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Header, Sider, Content } = Layout;
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}
