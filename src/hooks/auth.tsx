// Importações necessárias
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"; // Importamos a instância do axios para fazer solicitações HTTP
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

// Interfaces
interface UserData {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
}

interface User {
  email: string;
  password: string;
}

interface JwtPayload {
  userId: string;
  isAdmin: boolean;
  // Outras propriedades do token JWT, se houver
}

interface AuthContextType extends UserData {
  signIn: (credentials: { email: string; password: string }) => Promise<void>; // Alteramos o tipo de retorno de signIn
  signOut: () => void;
}

// Criação do contexto de autenticação
export const AuthContext = createContext({} as AuthContextType);

// Componente do provedor de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserData>({
    user: null,
    token: null,
    isAdmin: false,
  });

  // Função de login
  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const res = await api.post("/login", { email, password }); // Fazemos uma solicitação HTTP para o endpoint de login
      const { token } = res.data;

      // Atualizando o estado com os dados de autenticação
      setData({ user: { email, password }, token, isAdmin: res.data.isAdmin });
      toast.success("Login feito com sucesso.");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.data && error.response.data.error) {
        // Se houver uma mensagem de erro na resposta, exiba-a
        toast.error(error.response.data.error);
      } else {
        // Caso contrário, exiba uma mensagem de erro genérica
        toast.error(
          "Erro ao fazer login. Por favor, tente novamente mais tarde."
        );
      }
      throw error;
    }
  }

  // Função de logout
  function signOut() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // essa linha apaga o cookie

    setData({ user: null, token: null, isAdmin: false });
  }

  useEffect(() => {
    // Obter o cookie "token"
    const tokenCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));

    // Se o cookie "token" existir
    if (tokenCookie) {
      // Obter o valor do token do cookie
      const token = tokenCookie.split("=")[1];

      // Decodificar o token JWT para extrair informações do usuário
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setData({
          user: null, // Por enquanto, definimos como null, pois estamos apenas decodificando o token
          token,
          isAdmin: decodedToken.isAdmin,
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setData({ user: null, token: null, isAdmin: false });
      }
    } else {
      // Se o cookie "token" não existir, limpe os dados de autenticação
      setData({ user: null, token: null, isAdmin: false });
    }
  }, []);

  // Renderização do provedor de autenticação
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
        token: data.token,
        isAdmin: data.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para utilizar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
