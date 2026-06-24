import admin from "firebase-admin";

// firebase private keys are a pain as env vars — newlines get mangled by hosts.
// accept the key as raw PEM or base64, and tolerate stray wrapping quotes.
function getPrivateKey(): string | undefined {
  let key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;

  key = key.trim();

  // drop quotes someone may have pasted around the value
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // no PEM header means it's base64 — decode it back to the real key
  if (!key.includes("BEGIN")) {
    key = Buffer.from(key, "base64").toString("utf8").trim();
  }

  // put real newlines back in case they came through escaped
  return key.replace(/\\n/g, "\n");
}

// init firebase admin once (server side) — we only need it to verify id tokens
export const getFirebaseAdminAuth = () => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
          privateKey: getPrivateKey(),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
      });
    }

    return admin.app();
  } catch (error) {
    console.error("Firebase Admin initialization error", error);
    throw new Error("Failed to initialize Firebase Admin");
  }
};
