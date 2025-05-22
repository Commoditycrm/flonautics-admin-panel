"use client"

import 'antd/dist/reset.css' // Ant Design v5+ reset styles
import '../style/global.css'

import { ReactNode } from 'react'
import { Layout } from 'antd'
import { usePathname } from 'next/navigation'

import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'


const { Header, Sider, Content } = Layout;

export default function RootLayout({ children }: { children: ReactNode }) {

  const pathname = usePathname()

  // If on home route (/), render "Hello" only
  if (pathname === '/') {
    return (
      <html lang="en">
        <body>
          <Login />
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body>
        <Layout className='h-[100vh]'>
          <Header>
            <Navbar />
          </Header>

          <Layout>
            <Sider width={240}>
              <Sidebar />
            </Sider>

            <Content className='p-[22px] bg-amber-200'>{children}</Content>
          </Layout>
        </Layout>
      </body>
    </html>
  )
}
