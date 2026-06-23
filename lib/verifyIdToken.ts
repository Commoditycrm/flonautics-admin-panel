import { getFirebaseAdminAuth } from "@/lib/firebase-admin";

// verify the id token (checkRevoked = true) and return its claims; throws if bad
export async function verifyIdToken(idToken: string) {
  const firebaseAuth = getFirebaseAdminAuth().auth();

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(idToken, true);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw new Error("Token is either invalid or revoked");
  }
}
