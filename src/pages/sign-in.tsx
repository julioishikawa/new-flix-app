import { useState } from "react";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

export function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e: any) {
    e.preventDefault();

    signIn({ email, password });
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handleSignIn(e);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
      <Link to="/registro">Criar uma conta</Link>
    </div>
  );
}
