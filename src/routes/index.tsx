import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { token } = useAuth();

  return (
    <BrowserRouter>{token ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
}
