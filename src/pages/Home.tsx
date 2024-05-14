import { useState, useEffect } from "react";
import { useMovies } from "../hooks/movies";
import { Header } from "../components/header";
import { MovieCategory } from "../components/movie-category";
import { MovieCategoryTopTen } from "../components/movie-category-top-ten";
import { LoadingSpinner } from "../components/loading-spinner";

interface Movie {
  id: string;
  image: string;
  title: string;
  genres: string[];
  description: string;
  demo_content: {
    trailer_URL: string;
  };
  vipVotes?: number;
}

export function Home() {
  const { movies } = useMovies();

  const [topTenMovies, setTopTenMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [scifiMovies, setScifiMovies] = useState<Movie[]>([]);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[]>([]);
  const [terrorMovies, setTerrorMovies] = useState<Movie[]>([]);
  const [moviesLoaded, setMoviesLoaded] = useState(false);

  function filterMoviesByCategory(category: string) {
    if (category === "Todos") {
      // Filtrar os filmes que têm votos VIP
      const topTenMoviesFiltered = movies
        .filter((movie: Movie) => movie.vipVotes !== undefined)
        .sort((a: Movie, b: Movie) => (a.vipVotes! > b.vipVotes! ? -1 : 1))
        .slice(0, 10);

      setTopTenMovies(topTenMoviesFiltered);

      // Preencher todas as categorias com todos os filmes
      const allCategories: { [key: string]: Movie[] } = {
        Ação: movies.filter((movie: Movie) => movie.genres.includes("Ação")),

        Comédia: movies.filter((movie: Movie) =>
          movie.genres.includes("Comédia")
        ),

        Drama: movies.filter((movie: Movie) => movie.genres.includes("Drama")),

        FiccaoCientifica: movies.filter((movie: Movie) =>
          movie.genres.includes("Ficção Científica")
        ),

        Suspense: movies.filter((movie: Movie) =>
          movie.genres.includes("Suspense")
        ),

        Terror: movies.filter((movie: Movie) =>
          movie.genres.includes("Terror")
        ),
      };

      // Definir os estados para cada categoria
      setActionMovies(allCategories["Ação"]);
      setComedyMovies(allCategories["Comédia"]);
      setDramaMovies(allCategories["Drama"]);
      setScifiMovies(allCategories["FiccaoCientifica"]);
      setThrillerMovies(allCategories["Suspense"]);
      setTerrorMovies(allCategories["Terror"]);
    } else if (category === "Top 10") {
      // Filtrar os filmes que têm votos VIP
      const topTenMoviesFiltered = movies
        .filter((movie: Movie) => movie.vipVotes !== undefined)
        .sort((a: Movie, b: Movie) => (a.vipVotes! > b.vipVotes! ? -1 : 1))
        .slice(0, 10);

      setTopTenMovies(topTenMoviesFiltered);

      // Limpar os estados das outras categorias
      setActionMovies([]);
      setComedyMovies([]);
      setDramaMovies([]);
      setScifiMovies([]);
      setThrillerMovies([]);
      setTerrorMovies([]);
    } else {
      // Filtrar os filmes por categoria
      const filteredMovies = movies.filter((movie: Movie) =>
        movie.genres.includes(category)
      );

      switch (category) {
        case "Top 10":
          setTopTenMovies(filteredMovies);
          setActionMovies([]);
          setComedyMovies([]);
          setDramaMovies([]);
          setScifiMovies([]);
          setThrillerMovies([]);
          setTerrorMovies([]);
          break;
        case "Ação":
          setTopTenMovies([]);
          setActionMovies(filteredMovies);
          setComedyMovies([]);
          setDramaMovies([]);
          setScifiMovies([]);
          setThrillerMovies([]);
          setTerrorMovies([]);
          break;
        case "Comédia":
          setTopTenMovies([]);
          setActionMovies([]);
          setComedyMovies(filteredMovies);
          setDramaMovies([]);
          setScifiMovies([]);
          setThrillerMovies([]);
          setTerrorMovies([]);
          break;
        case "Drama":
          setTopTenMovies([]);
          setActionMovies([]);
          setComedyMovies([]);
          setDramaMovies(filteredMovies);
          setScifiMovies([]);
          setThrillerMovies([]);
          setTerrorMovies([]);
          break;
        case "Ficção Científica":
          setTopTenMovies([]);
          setActionMovies([]);
          setComedyMovies([]);
          setDramaMovies([]);
          setScifiMovies(filteredMovies);
          setThrillerMovies([]);
          setTerrorMovies([]);
          break;
        case "Suspense":
          setTopTenMovies([]);
          setActionMovies([]);
          setComedyMovies([]);
          setDramaMovies([]);
          setScifiMovies([]);
          setThrillerMovies(filteredMovies);
          setTerrorMovies([]);
          break;
        case "Terror":
          setTopTenMovies([]);
          setActionMovies([]);
          setComedyMovies([]);
          setDramaMovies([]);
          setScifiMovies([]);
          setThrillerMovies([]);
          setTerrorMovies(filteredMovies);
          break;
      }
    }
  }

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

    const topTenMoviesFiltered = movies
      .filter((movie: Movie) => movie.vipVotes !== undefined)
      .sort((a: Movie, b: Movie) => (a.vipVotes! > b.vipVotes! ? -1 : 1))
      .slice(0, 10);

    setTopTenMovies(topTenMoviesFiltered);

    // Quando os filmes são carregados, marcamos como carregado
    if (movies.length > 0) {
      setMoviesLoaded(true);
    }
  }, [movies]);

  if (!moviesLoaded) {
    return (
      <div className="flex p-5 justify-center items-center min-h-screen bg-neutral-950">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 min-h-screen">
      <Header filterMoviesByCategory={filterMoviesByCategory} />

      <div className="p-10 animate-slide-right">
        {topTenMovies.length > 0 && (
          <MovieCategoryTopTen title="Top 10" movies={topTenMovies} />
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
