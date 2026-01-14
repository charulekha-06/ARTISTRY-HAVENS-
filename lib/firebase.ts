import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAP2HqkiAmvGQBKSuYR14Szh25CyLP3fK0",
  authDomain: "snappy-photon-484114-t9.firebaseapp.com",
  projectId: "snappy-photon-484114-t9",
  storageBucket: "snappy-photon-484114-t9.firebasestorage.app",
  messagingSenderId: "615500564729",
  appId: "1:615500564729:web:07b7fa94086eaf4aec7a28",
};

// Initialize Firebase only if config is valid
const app = (!getApps().length && firebaseConfig.apiKey) ? initializeApp(firebaseConfig) : (getApps().length ? getApp() : undefined);

// Export dummy auth/db if app is not initialized (e.g. during build)
const auth = app ? getAuth(app) : {} as any;
const db = app ? getFirestore(app) : {} as any;
const functions = app ? getFunctions(app) : {} as any;

export { app, auth, db, functions };
