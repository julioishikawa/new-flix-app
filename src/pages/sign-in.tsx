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
    <div className="flex items-center min-h-screen bg-black">
      <div className="h-auto max-w-md mx-auto p-6 bg-white rounded-lg animate-opacity-down">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Ainda não tem uma conta?{" "}
          <Link to="/registro" className="text-red-500 hover:underline">
            Crie uma conta
          </Link>
        </p>
      </div>
    </div>
  );
}
