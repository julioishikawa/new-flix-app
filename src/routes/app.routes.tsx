import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/auth";
import { MoviesProvider } from "../hooks/movies";
import { Home } from "../pages/home";
import { NewMovie } from "../pages/new-movie";
import { SubscriptionWarningPage } from "../pages/subscription-warn-page";
import { FilmPlayer } from "../pages/film-player";
import { UpdateMovie } from "../pages/update-movie";
import { Profile } from "../pages/profile";

export function AppRoutes() {
  const { isAdmin, hasSubscription } = useAuth();

  return (
    <MoviesProvider>
      <Routes>
        {(isAdmin || hasSubscription) && <Route path="/" element={<Home />} />}
        {!hasSubscription && (
          <Route path="/" element={<SubscriptionWarningPage />} />
        )}
        {isAdmin && <Route path="/newmovie" element={<NewMovie />} />}
        {isAdmin && (
          <Route path="/updatemovie/:movieId" element={<UpdateMovie />} />
        )}
        {(isAdmin || hasSubscription) && (
          <Route path="/watch/:movieId" element={<FilmPlayer />} />
        )}
        {(isAdmin || hasSubscription) && (
          <Route path="/profile/:userId" element={<Profile />} />
        )}
      </Routes>
    </MoviesProvider>
  );
}
