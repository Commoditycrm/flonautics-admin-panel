export const runtime = "nodejs";

import { cookies } from "next/headers";

// Same-origin proxy for GraphQL. The browser can't send the httpOnly `session`
// cookie to the backend cross-domain (admin and API live on different hosts in
// prod), so we take the request here — same origin, cookie included — and
// forward it to the real backend with the session attached.
const BACKEND_GRAPHQL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/graphql`;

export async function POST(req: Request) {
  const session = (await cookies()).get("session")?.value;
  const body = await req.text();

  const headers: Record<string, string> = {
    "content-type": req.headers.get("content-type") || "application/json",
  };
  if (session) {
    headers.cookie = `session=${session}`;
  }
  // pass through invite tokens if the backend ever needs them
  const auth = req.headers.get("authorization");
  if (auth) {
    headers.authorization = auth;
  }

  const res = await fetch(BACKEND_GRAPHQL, {
    method: "POST",
    headers,
    body,
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  });
}
