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
      console.log("Fetching all movies...");
      const res = await api.get("/movielist");
      console.log("Fetched all movies successfully:", res.data);
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async function searchMovies(searchText: string) {
    try {
      console.log("Searching for movies with text:", searchText);
      const res = await api.get(`/movielist?searchText=${searchText}`);
      console.log("Search results:", res.data);
      setMovieSought(res.data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }

  useEffect(() => {
    console.log("Component mounted, fetching all movies...");
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
