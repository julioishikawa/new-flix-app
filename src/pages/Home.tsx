import { useState, useEffect } from "react";
import { useMovies } from "../hooks/movies";
import { Header } from "../components/header";
import { MovieCategory } from "../components/movie-category";

interface Movie {
  id: string;
  image: string;
  title: string;
  gender: string;
  description: string;
  content: {
    URL: string;
  };
}

export function Home() {
  const { movies } = useMovies();

  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);

  function filterMoviesByCategory(data: Movie[] | undefined) {
    if (!data) return; // Return early if data is undefined

    const actionMovies = data.filter(
      (movie: Movie) => movie.gender === "action"
    );
    const comedyMovies = data.filter(
      (movie: Movie) => movie.gender === "comedy"
    );
    const dramaMovies = data.filter((movie: Movie) => movie.gender === "drama");

    setActionMovies(actionMovies);
    setComedyMovies(comedyMovies);
    setDramaMovies(dramaMovies);
  }

  useEffect(() => {
    filterMoviesByCategory(movies);
  }, [movies]);

  return (
    <div className="bg-black h-screen">
      <Header />

      <div className="p-10">
        {actionMovies.length > 0 && (
          <MovieCategory title="action" movies={actionMovies} />
        )}
        {comedyMovies.length > 0 && (
          <MovieCategory title="comedy" movies={comedyMovies} />
        )}
        {dramaMovies.length > 0 && (
          <MovieCategory title="drama" movies={dramaMovies} />
        )}
      </div>
    </div>
  );
}
