import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { DeleteButton } from "../components/delete-button";
import { useAuth } from "../hooks/auth";
import { LoadingSpinner } from "../components/loading-spinner";

import { toast } from "sonner";
import { useMovies } from "../hooks/movies";

import {
  ArrowLeft,
  ThumbsDown,
  Frown,
  Meh,
  Smile,
  ThumbsUp,
  Heart,
  X,
} from "lucide-react";

interface Movie {
  id: string;
  title: string;
  content: {
    URL: string;
  };
  rating: number;
}

export function FilmPlayer() {
  const { isAdmin } = useAuth();
  const { getAllMovies } = useMovies();
  const { movieId } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [ratingSelected, setRatingSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  async function handleRatingSubmit() {
    try {
      if (ratingSelected !== null) {
        // Atualiza o filme com o novo rating
        await api.post(`/movielist/${movieId}/rating`, {
          rating: ratingSelected,
        });

        setShowModal(false);
        getAllMovies();
        navigate("/");
        toast.success("Obrigado pela classificação!");
      }
    } catch (error) {
      console.error("Erro ao enviar rating:", error);
    }
  }

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
          <button
            className="text-white mb-4 transition ease-in-out hover:scale-110 duration-300"
            onClick={handleOpenModal}
          >
            <ArrowLeft size="24" />
          </button>

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

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative flex flex-col gap-8 items-center bg-black p-8 rounded-lg border-2">
              <button
                className="absolute top-3 right-3 text-white"
                onClick={handleCloseModal}
              >
                <X className="cursor-pointer transition ease-in-out hover:scale-110 duration-100" />
              </button>

              <h1 className="text-white text-lg">
                Obrigado por assistir, deseja classificar o filme?
              </h1>

              <div className="flex justify-center gap-4">
                <div className="text-white flex flex-col items-center gap-2 min-w-20">
                  <ThumbsDown
                    size="40"
                    onClick={() => setRatingSelected(17)}
                    className={
                      ratingSelected === 17
                        ? "text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                        : "hover:text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                    }
                  />
                  <p>Péssimo</p>
                </div>

                <div className="text-white flex flex-col items-center gap-2 min-w-20">
                  <Frown
                    size="40"
                    onClick={() => setRatingSelected(34)}
                    className={
                      ratingSelected === 34
                        ? "text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                        : "hover:text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                    }
                  />
                  <p>Ruim</p>
                </div>

                <div className="text-white flex flex-col items-center gap-2 min-w-20">
                  <Meh
                    size="40"
                    onClick={() => setRatingSelected(51)}
                    className={
                      ratingSelected === 51
                        ? "text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                        : "hover:text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                    }
                  />

                  <p>Mediano</p>
                </div>

                <div className="text-white flex flex-col items-center gap-2 min-w-20">
                  <Smile
                    size="40"
                    onClick={() => setRatingSelected(68)}
                    className={
                      ratingSelected === 68
                        ? "text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                        : "hover:text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                    }
                  />
                  <p>Bom</p>
                </div>

                <div className="text-white flex flex-col items-center gap-2 min-w-20">
                  <ThumbsUp
                    size="40"
                    onClick={() => setRatingSelected(85)}
                    className={
                      ratingSelected === 85
                        ? "text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                        : "hover:text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                    }
                  />
                  <p>Ótimo</p>
                </div>

                <div className="text-white flex flex-col items-center gap-2 min-w-20">
                  <Heart
                    size="40"
                    onClick={() => setRatingSelected(100)}
                    className={
                      ratingSelected === 100
                        ? "text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                        : "hover:text-red-500 cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                    }
                  />
                  <p>Excelente</p>
                </div>
              </div>

              <button
                className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition ease-in-out duration-300"
                onClick={handleRatingSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
