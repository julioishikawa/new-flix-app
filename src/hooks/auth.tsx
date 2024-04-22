import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

// Interfaces
interface UserData {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  hasSubscription: boolean; // Inicialize hasSubscription como false
}

interface User {
  email: string;
  password: string;
}

interface JwtPayload {
  userId: string;
  isAdmin: boolean;
  hasSubscription: boolean; // Adicione hasSubscription à interface JwtPayload
  // Outras propriedades do token JWT, se houver
}

interface AuthContextType extends UserData {
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserData>({
    user: null,
    token: null,
    isAdmin: false,
    hasSubscription: false, // Inicialize hasSubscription como false
  });

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const res = await api.post("/login", { email, password });
      const { token } = res.data;
      const decodedToken = jwtDecode<JwtPayload>(token);

      setData({
        user: { email, password },
        token,
        isAdmin: decodedToken.isAdmin,
        hasSubscription: decodedToken.hasSubscription, // Defina hasSubscription com base no token decodificado
      });
      toast.success("Login feito com sucesso.");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(
          "Erro ao fazer login. Por favor, tente novamente mais tarde."
        );
      }
      throw error;
    }
  }

  function signOut() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setData({
      user: null,
      token: null,
      isAdmin: false,
      hasSubscription: false, // Defina hasSubscription como false durante o logout
    });
  }

  useEffect(() => {
    const tokenCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));

    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];

      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setData({
          user: null,
          token,
          isAdmin: decodedToken.isAdmin,
          hasSubscription: decodedToken.hasSubscription, // Defina hasSubscription com base no token decodificado
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setData({
          user: null,
          token: null,
          isAdmin: false,
          hasSubscription: false,
        });
      }
    } else {
      setData({
        user: null,
        token: null,
        isAdmin: false,
        hasSubscription: false,
      });
    }
  }, []);

  // Renderize o AuthContext.Provider para todos os casos
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
        token: data.token,
        isAdmin: data.isAdmin,
        hasSubscription: data.hasSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
