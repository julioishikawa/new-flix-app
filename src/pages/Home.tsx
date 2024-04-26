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
  const [moviesLoaded, setMoviesLoaded] = useState(false);

  const filterMoviesByCategory = (category: string) => {
    const filteredMovies = movies.filter((movie: Movie) =>
      movie.genres.includes(category)
    );

    switch (category) {
      case "Ação":
        setActionMovies(filteredMovies);
        setComedyMovies([]);
        setDramaMovies([]);
        setScifiMovies([]);
        setThrillerMovies([]);
        setTerrorMovies([]);
        break;
      case "Comédia":
        setActionMovies([]);
        setComedyMovies(filteredMovies);
        setDramaMovies([]);
        setScifiMovies([]);
        setThrillerMovies([]);
        setTerrorMovies([]);
        break;
      case "Drama":
        setActionMovies([]);
        setComedyMovies([]);
        setDramaMovies(filteredMovies);
        setScifiMovies([]);
        setThrillerMovies([]);
        setTerrorMovies([]);
        break;
      case "Ficção Científica":
        setActionMovies([]);
        setComedyMovies([]);
        setDramaMovies([]);
        setScifiMovies(filteredMovies);
        setThrillerMovies([]);
        setTerrorMovies([]);
        break;
      case "Suspense":
        setActionMovies([]);
        setComedyMovies([]);
        setDramaMovies([]);
        setScifiMovies([]);
        setThrillerMovies(filteredMovies);
        setTerrorMovies([]);
        break;
      case "Terror":
        setActionMovies([]);
        setComedyMovies([]);
        setDramaMovies([]);
        setScifiMovies([]);
        setThrillerMovies([]);
        setTerrorMovies(filteredMovies);
        break;
      default:
        setActionMovies([]);
        setComedyMovies([]);
        setDramaMovies([]);
        setScifiMovies([]);
        setThrillerMovies([]);
        setTerrorMovies([]);
        break;
    }
  };

  useEffect(() => {
    // Filtrar os filmes para cada categoria individualmente
    const actionMoviesFiltered = movies.filter((movie: Movie) =>
      movie.genres.includes("Ação")
    );
    const comedyMoviesFiltered = movies.filter((movie: Movie) =>
      movie.genres.includes("Comédia")
    );
    const dramaMoviesFiltered = movies.filter((movie: Movie) =>
      movie.genres.includes("Drama")
    );
    const scifiMoviesFiltered = movies.filter((movie: Movie) =>
      movie.genres.includes("Ficção Científica")
    );
    const thrillerMoviesFiltered = movies.filter((movie: Movie) =>
      movie.genres.includes("Suspense")
    );
    const terrorMoviesFiltered = movies.filter((movie: Movie) =>
      movie.genres.includes("Terror")
    );

    // Definir os estados dos filmes para cada categoria correspondente
    setActionMovies(actionMoviesFiltered);
    setComedyMovies(comedyMoviesFiltered);
    setDramaMovies(dramaMoviesFiltered);
    setScifiMovies(scifiMoviesFiltered);
    setThrillerMovies(thrillerMoviesFiltered);
    setTerrorMovies(terrorMoviesFiltered);

    // Quando os filmes são carregados, marcamos como carregado
    if (movies.length > 0) {
      setMoviesLoaded(true);
    }
  }, [movies]);

  if (!moviesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <Header filterMoviesByCategory={filterMoviesByCategory} />

      <div className="p-10 animate-slide-right">
        {!actionMovies.length &&
          !comedyMovies.length &&
          !dramaMovies.length &&
          !scifiMovies.length &&
          !thrillerMovies.length &&
          !terrorMovies.length && (
            <>
              <MovieCategory title="Ação" movies={actionMovies} />
              <MovieCategory title="Comédia" movies={comedyMovies} />
              <MovieCategory title="Drama" movies={dramaMovies} />
              <MovieCategory title="Ficção Científica" movies={scifiMovies} />
              <MovieCategory title="Suspense" movies={thrillerMovies} />
              <MovieCategory title="Terror" movies={terrorMovies} />
            </>
          )}

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
