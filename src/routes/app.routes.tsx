import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/auth";
import { MoviesProvider } from "../hooks/movies";
import { Home } from "../pages/home";
import { NewMovie } from "../pages/new-movie";

export function AppRoutes() {
  const { isAdmin } = useAuth();

  return (
    <MoviesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        {isAdmin && <Route path="/newmovie" element={<NewMovie />} />}
      </Routes>
    </MoviesProvider>
  );
}
