import { User } from "firebase/auth";

// if a call is already in flight, reuse it instead of hitting the route twice
let sessionSetPromise: Promise<Response> | null = null;

// trade the firebase id token for our session cookie via /api/session/set
export async function createSessionOnce(user: User) {
  if (!sessionSetPromise) {
    sessionSetPromise = user
      .getIdToken()
      .then((token) =>
        fetch("/api/session/set", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          credentials: "include",
          cache: "no-store",
        }),
      )
      .finally(() => {
        sessionSetPromise = null;
      });
  }

  return sessionSetPromise;
}
