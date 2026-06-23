export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { getRedisClient } from "@/lib/redisClient";

// returns the current session, or 401. handy for client-side guards since the
// session cookie is httpOnly and JS can't read it directly.
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, reason: "SESSION_COOKIE_MISSING" },
        { status: 401 },
      );
    }

    if (!process.env.SESSION_SECRET) {
      return NextResponse.json(
        { ok: false, reason: "SESSION_SECRET_MISSING" },
        { status: 500 },
      );
    }

    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const sessionId = payload.sessionId as string | undefined;

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, reason: "SESSION_ID_MISSING" },
        { status: 401 },
      );
    }

    const redis = getRedisClient();
    const redisKey = `session:${sessionId}`;
    const redisSession = await redis.get(redisKey);

    if (!redisSession) {
      return NextResponse.json(
        { ok: false, reason: "SESSION_NOT_FOUND_IN_REDIS", sessionId },
        { status: 401 },
      );
    }

    let parsedSession: Record<string, any>;

    try {
      parsedSession = JSON.parse(redisSession);
    } catch {
      await redis.del(redisKey);
      return NextResponse.json(
        { ok: false, reason: "INVALID_REDIS_SESSION_JSON", sessionId },
        { status: 401 },
      );
    }

    return NextResponse.json({
      ok: true,
      sessionId,
      user: {
        uid: parsedSession.uid,
        email: parsedSession.email,
        email_verified: parsedSession.email_verified,
        roles: parsedSession.roles || [],
        orgCreated: parsedSession.orgCreated || false,
        name: parsedSession.name,
        phone_number: parsedSession.phone_number,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "INVALID_OR_EXPIRED_SESSION" },
      { status: 401 },
    );
  }
}
