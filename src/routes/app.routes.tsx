import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/auth";
import { MoviesProvider } from "../hooks/movies";
import { Home } from "../pages/home";
import { NewMovie } from "../pages/new-movie";
import { SubscriptionWarningPage } from "../pages/subscription-warn-page";

export function AppRoutes() {
  const { isAdmin, hasSubscription } = useAuth();

  return (
    <MoviesProvider>
      <Routes>
        {(isAdmin || hasSubscription) && <Route path="/" element={<Home />} />}
        {isAdmin && <Route path="/newmovie" element={<NewMovie />} />}
        {!hasSubscription && (
          <Route path="/" element={<SubscriptionWarningPage />} />
        )}
      </Routes>
    </MoviesProvider>
  );
}
