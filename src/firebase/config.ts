import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7XmzXUuOyox5MWfKW1aO93FHEvKcShJw",
  authDomain: "richly-1f057.firebaseapp.com",
  projectId: "richly-1f057",
  storageBucket: "richly-1f057.firebasestorage.app",
  messagingSenderId: "1066339230952",
  appId: "1:1066339230952:web:43784dde87cc9c9b28555d",
  measurementId: "G-Y4FDBSFSK7",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
export const provider = new GoogleAuthProvider();