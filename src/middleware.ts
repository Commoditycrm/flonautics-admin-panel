import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Running middleware for:", request.nextUrl.pathname); // log
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/organizations", request.url));
  }

  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
