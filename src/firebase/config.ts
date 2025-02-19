// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "richly-1f057.firebaseapp.com",
  projectId: "richly-1f057",
  storageBucket: "richly-1f057.firebasestorage.app",
  messagingSenderId: "1066339230952",
  appId: "1:1066339230952:web:43784dde87cc9c9b28555d",
  measurementId: "G-Y4FDBSFSK7",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();