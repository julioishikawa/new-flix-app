import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./routes";
import { Toaster } from "sonner";
import "./index.css";
import { AuthProvider } from "./hooks/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
      <Toaster richColors />
    </AuthProvider>
  </React.StrictMode>
);
