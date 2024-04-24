import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

// Interfaces
interface UserData {
  userId: string | null;
  token: string | null;
  isAdmin: boolean;
  hasSubscription: boolean;
}

interface JwtPayload {
  userId: string;
  isAdmin: boolean;
  hasSubscription: boolean;
}

interface AuthContextType extends UserData {
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateToken: (token: string) => void; // Adicione a função updateToken ao contexto
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserData>({
    userId: null,
    token: null,
    isAdmin: false,
    hasSubscription: false,
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
        userId: decodedToken.userId, // Defina userId com base no token decodificado
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
      userId: null,
      token: null,
      isAdmin: false,
      hasSubscription: false,
    });
  }

  function updateToken(newToken: string) {
    console.log("Novo token recebido:", newToken);

    // Define o novo token no estado
    setData((prevData) => ({
      ...prevData,
      token: newToken,
    }));

    // Expira o cookie antigo
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Define o novo token no cookie
    document.cookie = `token=${newToken}; path=/;`;
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
          userId: decodedToken.userId, // Defina userId com base no token decodificado
          token,
          isAdmin: decodedToken.isAdmin,
          hasSubscription: decodedToken.hasSubscription, // Defina hasSubscription com base no token decodificado
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setData({
          userId: null, // Defina userId como null em caso de erro de decodificação
          token: null,
          isAdmin: false,
          hasSubscription: false,
        });
      }
    } else {
      setData({
        userId: null, // Defina userId como null se não houver token no cookie
        token: null,
        isAdmin: false,
        hasSubscription: false,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateToken,
        userId: data.userId,
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
