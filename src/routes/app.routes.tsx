import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { MoviesProvider } from "../hooks/movies";

export function AppRoutes() {
  return (
    <MoviesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MoviesProvider>
  );
}
