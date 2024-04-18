import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";

interface Movie {
  id: string;
  image: string;
  title: string;
  gender: string;
  description: string;
}

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesContext = createContext<any>({});

function MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieSought, setMovieSought] = useState<Movie[]>([]);

  async function getAllMovies() {
    try {
      const res = await api.get("/movielist");
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async function searchMovies(searchText: string) {
    try {
      const res = await api.get(`/movielist?searchText=${searchText}`);

      setMovieSought(res.data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        getAllMovies,
        searchMovies,
        movies,
        movieSought,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
}

export { MoviesProvider, useMovies };
