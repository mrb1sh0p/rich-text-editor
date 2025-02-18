import "./css/LoginButton.css";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";

const LoginButton = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <header>
      <div className="auth-section">
        {user ? (
          <button className="logout" onClick={signOut}>
            <span>Sair</span>
          </button>
        ) : (
          <button className="login" onClick={signInWithGoogle}>
            Login <FaGoogle />
          </button>
        )}
      </div>
    </header>
  );
};

export default LoginButton;
