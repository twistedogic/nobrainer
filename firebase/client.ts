import { initializeApp } from "firebase/app";
import {
  isSupported,
  getAnalytics,
  logEvent,
  setCurrentScreen,
} from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const analytics = isSupported() ? getAnalytics(app) : null;
const googleId = GoogleAuthProvider.PROVIDER_ID;
const signInConfig = {
  signInSuccessUrl: "/login",
  signInOptions: [googleId],
};

export { app, auth, analytics, firestore, signInConfig };

export const defaultLogin = () => signInAnonymously(auth);
export const logout = () => signOut(auth);
export const logScreenView = (url: string) => {
  setCurrentScreen(analytics, url);
  logEvent(analytics, "screen_view");
};
