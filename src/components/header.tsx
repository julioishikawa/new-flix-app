import React, { useState, useEffect } from "react";
import { SearchIcon, LogOutIcon, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/auth";
import { useMovies } from "../hooks/movies";
import { api } from "../services/api";
import avatarPlaceholder from "../assets/avatar_placeholder.png";
import MovieCardHeader from "./movie-card-header";

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
  const { signOut, isAdmin, userId, userAvatar, userName } = useAuth();
  const { searchMovies, movieSought } = useMovies();

  const avatarURL =
    userAvatar !== "default.jpg"
      ? `${api.defaults.baseURL}/users/${userId}/avatar`
      : avatarPlaceholder;

  const [searchText, setSearchText] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isNotebook, setIsNotebook] = useState(
    window.innerWidth > 768 && window.innerWidth < 1024
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    await searchMovies(text);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowCategories(showCategories);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category: string) => {
    if (category === "Todos") {
      filterMoviesByCategory("Todos");
    } else {
      filterMoviesByCategory(category);
    }
    setShowMenu(false);
    setShowCategories(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsNotebook(window.innerWidth > 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-7 px-6 md:px-8 lg:px-10 py-3 bg-neutral-800">
      {!isMobile && (
        <Link className="text-white" to="/">
          ICONE
        </Link>
      )}
      {isMobile && (
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Menu
          </button>
        </div>
      )}

      {isMobile && showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-start">
          <div className="bg-neutral-900 w-1/3 h-full p-6 flex flex-col gap-5 animate-slide-right">
            <div className="flex justify-end">
              <button onClick={toggleMenu}>
                <X
                  size={20}
                  className="text-white cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                />
              </button>
            </div>

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
                    onClick={() => handleCategoryClick("Todos")}
                    className="block text-white hover:text-gray-300 py-1"
                  >
                    Todos
                  </button>

                  <button
                    onClick={() => handleCategoryClick("Top 10")}
                    className="block text-white hover:text-gray-300 py-1"
                  >
                    Top 10
                  </button>

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

            {isAdmin && (
              <Link
                to="/newmovie"
                className="text-white hover:text-gray-300 block py-1"
              >
                Novo Filme
              </Link>
            )}

            <Link
              to={`/profile/${userId}`}
              className="text-white hover:text-gray-300 block py-1"
            >
              Perfil
            </Link>

            <Link
              to={"#"}
              className="text-white hover:text-gray-300 block py-1"
              onClick={signOut}
            >
              Sair
            </Link>
          </div>
        </div>
      )}

      {!isMobile && (
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
                onClick={() => handleCategoryClick("Todos")}
                className="block text-white hover:text-gray-300 py-1"
              >
                Todos
              </button>

              <button
                onClick={() => handleCategoryClick("Top 10")}
                className="block text-white hover:text-gray-300 py-1"
              >
                Top 10
              </button>

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
      )}

      <div className="w-4/5 md:w-2/5 lg:w-3/6 relative flex items-center gap-2 border-2 rounded border-white p-1">
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
      {!isMobile && isAdmin && (
        <Link
          to="/newmovie"
          className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
        >
          Novo filme
        </Link>
      )}
      <div className="flex gap-4 md:gap-10 items-center">
        <div className="flex gap-3 items-center">
          {!isMobile && !isNotebook && (
            <h1 className="text-white">
              Bem vindo, <br />{" "}
              <Link to={`/profile/${userId}`}>
                <span className="hover:text-red-800 transition ease-in-out duration-200">
                  {userName}
                </span>
              </Link>
            </h1>
          )}

          <Link to={`/profile/${userId}`} className="min-w-14">
            <img
              src={avatarURL}
              alt={`${userName} photo`}
              className="h-14 w-14 object-cover rounded-full transition ease-in-out hover:scale-110 duration-300"
            />
          </Link>
        </div>

        <button
          onClick={signOut}
          className="text-white transition ease-in-out hover:scale-110 duration-300"
        >
          <LogOutIcon size={20} />
        </button>
      </div>
    </div>
  );
}
