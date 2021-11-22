import firebase from "firebase/compat/app";
import { isSupported, getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const storage = app.storage();
const firestore = app.firestore();
const analytics = isSupported() ? getAnalytics(app) : null;
const googleId = GoogleAuthProvider.PROVIDER_ID;
const signInConfig = {
  signInSuccessUrl: "/",
  signInOptions: [googleId],
};

export { app, auth, analytics, firestore, signInConfig };
