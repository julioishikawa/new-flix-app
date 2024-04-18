import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "sonner";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(e: any) {
    e.preventDefault();
    try {
      await api.post("/users/newuser", {
        name,
        email,
        password,
        confirmPassword,
      });
      toast.success("Usuário registrado com sucesso.");
      navigate(-1);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        // Se o servidor retornar um erro específico, exibir a mensagem de erro retornada pelo servidor
        toast.error(err.response.data.error);
      } else {
        // Se houver qualquer outro tipo de erro, exibir uma mensagem de erro genérica
        toast.error("Não foi possível cadastrar. Por favor, tente novamente.");
      }
    }
  }

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
