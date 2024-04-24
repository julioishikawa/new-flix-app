import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { BackButton } from "../components/back-button";

interface Movie {
  id: string;
  title: string;
  content: {
    URL: string;
  };
}

export function FilmPlayer() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await api.get(`/movielist/${movieId}`);

        setMovie(res.data.movie);
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Carregando...</div>;
  }

  const { content } = movie;
  const { URL } = content;

  return (
    <div className="flex p-5 justify-center items-center min-h-screen bg-black">
      <div className="w-full h-full">
        <BackButton />

        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[90vh]"
            src={URL}
            title={movie.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
