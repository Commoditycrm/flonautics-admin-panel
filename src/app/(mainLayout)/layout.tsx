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
      <Layout className="h-[100vh] overflow-hidden">
        <Header className="h-[7.5vh]">
          <Navbar />
        </Header>
        <Layout>
          <Sider width={240}>
            <Sidebar />
          </Sider>
          <Content className="px-[22px] py-[16px] h-[92.5vh] overflow-auto">{children}</Content>
        </Layout>
      </Layout>
    </ApolloProvider>
  );
}
