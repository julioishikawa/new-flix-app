import React, { useState } from "react";
import { SearchIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../hooks/auth";
import { useMovies } from "../hooks/movies";
import MovieCardHeader from "./movie-card-header";
import { Link } from "react-router-dom";

interface Movie {
  id: string;
  image: string;
  title: string;
  genres: string[];
}

interface Props {
  filterMoviesByCategory: (category: string) => void;
}

export function Header({ filterMoviesByCategory }: Props) {
  const { signOut, isAdmin } = useAuth();
  const { searchMovies, movieSought } = useMovies();

  const [searchText, setSearchText] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    await searchMovies(text);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category: string) => {
    filterMoviesByCategory(category);
  };

  return (
    <div className="flex items-center justify-between gap-4 px-10 py-3 bg-neutral-800">
      <h1 className="text-white">ICONE</h1>

      <div className="relative">
        <button
          onClick={toggleCategories}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          Categorias
          <span className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 inline-block ${
                showCategories ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {showCategories && (
          <div className="flex flex-col absolute top-full left-0 bg-neutral-800 rounded shadow-lg py-2 px-4 mt-1 z-10 animate-opacity-down">
            <button
              onClick={() => handleCategoryClick("Ação")}
              className="block text-white hover:text-gray-300 py-1"
            >
              Ação
            </button>
            <button
              onClick={() => handleCategoryClick("Comédia")}
              className="block text-white hover:text-gray-300 py-1"
            >
              Comédia
            </button>
            <button
              onClick={() => handleCategoryClick("Drama")}
              className="block text-white hover:text-gray-300 py-1"
            >
              Drama
            </button>
            <button
              onClick={() => handleCategoryClick("Ficção Científica")}
              className="block text-white hover:text-gray-300 py-1"
            >
              Ficção Científica
            </button>
            <button
              onClick={() => handleCategoryClick("Suspense")}
              className="block text-white hover:text-gray-300 py-1"
            >
              Suspense
            </button>
            <button
              onClick={() => handleCategoryClick("Terror")}
              className="block text-white hover:text-gray-300 py-1"
            >
              Terror
            </button>
          </div>
        )}
      </div>

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

        {searchText.length > 0 && searchText !== "" && (
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
          className="text-white py-1 px-3 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
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
