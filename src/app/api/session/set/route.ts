export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { randomUUID } from "crypto";

import { verifyIdToken } from "@/lib/verifyIdToken";
import { getRedisClient } from "@/lib/redisClient";

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // a week

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "No token provided." },
        { status: 401 },
      );
    }

    if (!process.env.SESSION_SECRET) {
      return NextResponse.json(
        { message: "Server session secret missing." },
        { status: 500 },
      );
    }

    // check the firebase token before we trust anything in it
    const decoded = await verifyIdToken(token);

    if (!decoded.email_verified) {
      return NextResponse.json(
        { message: "Please verify your email first." },
        { status: 401 },
      );
    }

    const {
      uid,
      email,
      email_verified,
      roles = [],
      orgCreated = false,
      name,
      phone_number,
    } = decoded as Record<string, any>;

    // backend only ever looks up the redis key, so a random id does the job
    // (no need for the Neo4j UserSession node the main app keeps around)
    const sessionId = randomUUID();

    const sessionPayload = {
      sub: uid,
      uid,
      email,
      email_verified,
      roles,
      orgCreated,
      name,
      phone_number,
    };

    // sign our session jwt with the shared secret
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

    const appSession = await new SignJWT({ ...sessionPayload, sessionId })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
      .sign(secret);

    // stash it in redis so the backend can find it on the next request
    const redis = getRedisClient();
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(sessionPayload),
      "EX",
      SESSION_MAX_AGE_SEC,
    );

    // and hand back the httpOnly cookie
    const res = NextResponse.json({
      message: "Session set successfully",
      sessionId,
    });

    res.cookies.set("session", appSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SEC,
    });

    return res;
  } catch (err) {
    console.error("Session login failed", err);

    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
