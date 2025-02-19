import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY,
  AuthErrorCode,
} from "../authErrorCodes";
import { provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  User,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  createUserWithEmail: (params: {
    email: string;
    password: string;
    coPassword: string;
  }) => Promise<void>;
  signInWithEmail: (params: {
    email: string;
    password: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const createUserWithEmail = async ({
    email,
    password,
    coPassword,
  }: {
    email: string;
    password: string;
    coPassword: string;
  }) => {
    try {
      if (password !== coPassword) {
        throw new Error("PASSWORD_MISMATCH");
      }
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.message === "PASSWORD_MISMATCH") {
        throw new Error("PASSWORD_MISMATCH");
      }

      const firebaseErrorCode = error.code;
      const errorKey =
        Object.entries(AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY).find(
          ([, value]) => value === firebaseErrorCode
        )?.[0] || "INTERNAL_ERROR";

      throw new Error(errorKey);
    }
  };

  const signInWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorCode = error.code;
      const errorKey =
        (Object.entries(AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY).find(
          ([, value]) => value === errorCode
        )?.[0] as AuthErrorCode) || "INTERNAL_ERROR";

      throw new Error(errorKey);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Error signing out:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        createUserWithEmail,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
