import admin from "firebase-admin";

// init firebase admin once (server side) — we only need it to verify id tokens
export const getFirebaseAdminAuth = () => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
          // key comes through escaped, put the real newlines back
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
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
