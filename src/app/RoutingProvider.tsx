"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"

const protectedRoutes = ["/dashboard", "/humans", "/accounts", "/assets", "/contacts"] // Add more if needed

export default function RoutingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const accessToken = Cookies.get("accessToken")

  useEffect(() => {
    if (accessToken && pathname === "/") {
      // User is logged in and on login page → redirect to dashboard
      router.replace("/dashboard")
    } else if (!accessToken && protectedRoutes.includes(pathname)) {
      // User not logged in and trying to access protected page → redirect to login
      router.replace("/")
    }
  }, [accessToken, pathname, router])

  return <>{children}</>
}
