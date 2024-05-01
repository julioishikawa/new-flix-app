import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import { BackButton } from "../components/back-button";
import { DeleteButton } from "../components/delete-button";
import { useAuth } from "../hooks/auth";
import { LoadingSpinner } from "../components/loading-spinner";

interface Movie {
  id: string;
  title: string;
  content: {
    URL: string;
  };
}

export function FilmPlayer() {
  const { isAdmin } = useAuth();
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
    return (
      <div className="flex p-5 justify-center items-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex p-5 justify-center items-center min-h-screen bg-black">
      <div className="w-full h-full">
        <div className="flex justify-between h-full">
          <BackButton />
          {isAdmin && (
            <div className="flex gap-8">
              <Link
                to={`/updatemovie/${movie.id}`}
                className="mb-4 py-1 px-3 text-white bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
              >
                Editar
              </Link>
              <DeleteButton movieId={movie.id} />
            </div>
          )}
        </div>

        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[90vh]"
            src={movie.content.URL}
            title={movie.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
