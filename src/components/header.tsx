import { useState } from "react";
import { SearchIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";
import { useMovies } from "../hooks/movies";
import MovieCardHeader from "./movie-card-header";

interface Movie {
  id: string;
  image: string;
  title: string;
}

export function Header() {
  const { signOut, isAdmin } = useAuth();
  const { searchMovies, movieSought } = useMovies();

  const [searchText, setSearchText] = useState("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    await searchMovies(text);
  };

  return (
    <div className="flex items-center justify-between gap-4 px-10 py-3 bg-neutral-800">
      <h1 className="text-white">ICONE</h1>
      <div className="w-1/3 relative flex items-center gap-2 border-2 rounded border-white p-1">
        <span>
          <SearchIcon className="h-5 w-5 text-white" />
        </span>
        <input
          type="text"
          placeholder="Procurar"
          className="w-full bg-transparent text-white font-sans tracking-tight outline-none placeholder:text-white"
          value={searchText}
          onChange={handleSearch}
        />

        {searchText.length > 0 && searchText != "" && (
          <div className="absolute bg-neutral-700 top-8 left-0 w-full z-10 border-x-2 border-t-2 border-white animate-opacity-down">
            {movieSought.map((movie: Movie) => (
              <MovieCardHeader key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {isAdmin && (
        <Link
          to="/newmovie"
          className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
        >
          Novo filme
        </Link>
      )}

      <button
        onClick={signOut}
        className="text-white transition ease-in-out hover:scale-110 duration-300"
      >
        <LogOutIcon size={20} />
      </button>
    </div>
  );
}
