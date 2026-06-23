export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { getRedisClient } from "@/lib/redisClient";

function clearSessionCookie() {
  const res = NextResponse.json({ ok: true, message: "Logged out" });

  res.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    maxAge: 0,
  });

  return res;
}

export async function POST() {
  const res = clearSessionCookie();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token || !process.env.SESSION_SECRET) {
      return res;
    }

    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const sessionId = payload.sessionId as string | undefined;

    if (!sessionId) {
      return res;
    }

    // drop the redis session so the backend stops honouring it
    try {
      const redis = getRedisClient();
      await redis.del(`session:${sessionId}`);
    } catch (redisError) {
      console.error("Failed to delete Redis session", redisError);
    }

    return res;
  } catch (err) {
    console.error("Logout cleanup failed", err);
    // cookie's already gone, so call it a success anyway
    return res;
  }
}
