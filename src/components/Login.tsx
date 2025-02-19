// src/pages/Login.tsx
import { useState } from "react";
import { auth } from "../firebase/config";
import "./css/Login.css";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation("common");
  const { signInWithGoogle, createUserWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await createUserWithEmail({ email, password });
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await createUserWithEmail({ email, password });
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{t("login.welcome")} Richly</h1>
        <p className="subtitle">{t("login.title")}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label htmlFor="email">{t("login.email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("login.password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? t("login.logging_in") : t("login.sign_in")}
          </button>
        </form>

        <div className="separator">{t("login.or")}</div>

        <button
          className="google-btn"
          onClick={signInWithGoogle}
          disabled={isLoading}
        >
          {t("login.login_with")} Google
        </button>
      </div>
    </div>
  );
};

export default Login;
