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
  gender: string;
  description: string;
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
    <div className="flex items-center justify-between gap-4 px-10 py-3 bg-slate-900">
      <h1 className="text-white">ICONE</h1>
      <div className="w-1/3 relative flex items-center gap-2 border-2 rounded border-gray-500 p-1">
        <span>
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </span>
        <input
          type="text"
          placeholder="Procurar"
          className="w-full bg-transparent text-lg text-gray-500 font-semibold tracking-tight outline-none placeholder:text-gray-500"
          value={searchText}
          onChange={handleSearch}
        />

        {searchText.length > 0 && searchText != "" && (
          <div className="absolute bg-slate-800 top-9 left-0 w-full z-10 border-x-2 border-t-2 border-gray-500">
            {movieSought.map((movie: Movie) => (
              <MovieCardHeader key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {isAdmin && (
        <Link to="/newmovie" className="text-white">
          Novo filme
        </Link>
      )}

      <button onClick={signOut} className="text-white">
        <LogOutIcon size={20} />
      </button>
    </div>
  );
}
