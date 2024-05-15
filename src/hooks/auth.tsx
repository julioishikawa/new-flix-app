import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

interface UserData {
  userId: string | null;
  token: string | null;
  isAdmin: boolean;
  hasSubscription: boolean;
  isVIP: boolean;
  userName: string | null;
  userEmail: string | null;
  userAvatar: string | null;
}

interface JwtPayload {
  userId: string;
  isAdmin: boolean;
  hasSubscription: boolean;
  isVIP: boolean;
  userName: string;
  userEmail: string;
  userAvatar: string;
}

interface AuthContextType extends UserData {
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateToken: (token: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserData>({
    userId: null,
    token: null,
    isAdmin: false,
    hasSubscription: false,
    isVIP: false,
    userName: null,
    userEmail: null,
    userAvatar: null,
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
        userId: decodedToken.userId,
        token,
        isAdmin: decodedToken.isAdmin,
        hasSubscription: decodedToken.hasSubscription,
        isVIP: decodedToken.isVIP,
        userName: decodedToken.userName,
        userEmail: decodedToken.userEmail,
        userAvatar: decodedToken.userAvatar,
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
      isVIP: false,
      userName: null,
      userEmail: null,
      userAvatar: null,
    });
  }

  function updateToken(newToken: string) {
    setData((prevData) => ({
      ...prevData,
      token: newToken,
    }));

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
          userId: decodedToken.userId,
          token,
          isAdmin: decodedToken.isAdmin,
          hasSubscription: decodedToken.hasSubscription,
          isVIP: decodedToken.isVIP,
          userName: decodedToken.userName,
          userEmail: decodedToken.userEmail,
          userAvatar: decodedToken.userAvatar,
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setData({
          userId: null,
          token: null,
          isAdmin: false,
          hasSubscription: false,
          isVIP: false,
          userName: null,
          userEmail: null,
          userAvatar: null,
        });
      }
    } else {
      setData({
        userId: null,
        token: null,
        isAdmin: false,
        hasSubscription: false,
        isVIP: false,
        userName: null,
        userEmail: null,
        userAvatar: null,
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
        isVIP: data.isVIP,
        userName: data.userName,
        userEmail: data.userEmail,
        userAvatar: data.userAvatar,
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
