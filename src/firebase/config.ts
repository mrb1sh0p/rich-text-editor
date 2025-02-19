import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "richly-38041.firebaseapp.com",
  projectId: "richly-38041",
  storageBucket: "richly-38041.firebasestorage.app",
  messagingSenderId: "881751417958",
  appId: "1:881751417958:web:0ddf0b9595fb14123ff9a7",
  measurementId: "G-D9RGJDED76"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();