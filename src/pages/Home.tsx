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
  demo_content: {
    trailer_URL: string;
  };
  rating: number;
}

export function Home() {
  const { movies } = useMovies();

  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [scifiMovies, setScifiMovies] = useState<Movie[]>([]);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[]>([]);
  const [terrorMovies, setTerrorMovies] = useState<Movie[]>([]);

  function filterMoviesByCategory(data: Movie[] | undefined) {
    if (!data) return; // Return early if data is undefined

    const actionMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Ação")
    );

    const comedyMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Comédia")
    );

    const dramaMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Drama")
    );

    const scifiMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Ficção Científica")
    );

    const thrillerMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Suspense")
    );

    const terrorMovies = data.filter((movie: Movie) =>
      movie.genres.includes("Terror")
    );

    setActionMovies(actionMovies);
    setComedyMovies(comedyMovies);
    setDramaMovies(dramaMovies);
    setScifiMovies(scifiMovies);
    setThrillerMovies(thrillerMovies);
    setTerrorMovies(terrorMovies);
  }

  useEffect(() => {
    filterMoviesByCategory(movies);
  }, [movies]);

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="p-10 animate-slide-right">
        {actionMovies.length > 0 && (
          <MovieCategory title="Ação" movies={actionMovies} />
        )}

        {comedyMovies.length > 0 && (
          <MovieCategory title="Comédia" movies={comedyMovies} />
        )}

        {dramaMovies.length > 0 && (
          <MovieCategory title="Drama" movies={dramaMovies} />
        )}

        {scifiMovies.length > 0 && (
          <MovieCategory title="Ficção Cientifica" movies={scifiMovies} />
        )}

        {thrillerMovies.length > 0 && (
          <MovieCategory title="Suspense" movies={thrillerMovies} />
        )}

        {terrorMovies.length > 0 && (
          <MovieCategory title="Terror" movies={terrorMovies} />
        )}
      </div>
    </div>
  );
}
