import { useState, useEffect } from "react";
import { useMovies } from "../hooks/movies";
import { Header } from "../components/header";
import { MovieCategory } from "../components/movie-category";

interface Movie {
  id: string;
  image: string;
  title: string;
  genres: string[];
  description: string;
  content: {
    URL: string;
  };
}

export function Home() {
  const { movies } = useMovies();

  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [terrorMovies, setTerrorMovies] = useState<Movie[]>([]);

  function filterMoviesByCategory(data: Movie[] | undefined) {
    if (!data) return; // Return early if data is undefined

    const actionMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Ação")
    );
    const comedyMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Comédia")
    );
    const terrorMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Terror")
    );

    setActionMovies(actionMovies);
    setComedyMovies(comedyMovies);
    setTerrorMovies(terrorMovies);
  }

  useEffect(() => {
    filterMoviesByCategory(movies);
  }, [movies]);

  return (
    <div className="bg-black h-screen">
      <Header />

      <div className="p-10">
        {actionMovies.length > 0 && (
          <MovieCategory title="Ação" movies={actionMovies} />
        )}
        {comedyMovies.length > 0 && (
          <MovieCategory title="Comédia" movies={comedyMovies} />
        )}
        {terrorMovies.length > 0 && (
          <MovieCategory title="Terror" movies={terrorMovies} />
        )}
      </div>
    </div>
  );
}
