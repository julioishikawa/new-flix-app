import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "sonner";
import { LoadingSpinnerButton } from "../components/loading-spinner-button";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignUp(e: any) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um endereço de email válido.");
      return;
    }

    try {
      setIsLoading(true);

      await api.post("/users/newuser", {
        name,
        email,
        password,
        confirmPassword,
      });

      setIsLoading(false);
      toast.success("Usuário registrado com sucesso.");
      navigate(-1);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        // Se o servidor retornar um erro específico, exibir a mensagem de erro retornada pelo servidor
        toast.error(err.response.data.error);
        setIsLoading(false);
      } else {
        // Se houver qualquer outro tipo de erro, exibir uma mensagem de erro genérica
        toast.error("Não foi possível cadastrar. Por favor, tente novamente.");
        setIsLoading(false);
      }
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handleSignUp(e);
    }
  }

  return (
    <div className="flex items-center min-h-screen bg-black">
      <div className="h-auto max-w-md mx-auto p-6 bg-white rounded-lg animate-opacity-down">
        <h2 className="text-2xl font-semibold mb-4 text-center">Registro</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400"
              required
            />
          </div>
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
            <label htmlFor="password" className="mb-1">
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="mb-1">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            {isLoading ? <LoadingSpinnerButton /> : "Registrar"}
          </button>

          <p className="mt-4 text-center">
            Já tem uma conta?{" "}
            <Link to="/" className="text-red-500 hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
