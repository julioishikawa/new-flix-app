import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useMovies } from "../hooks/movies";
import { toast } from "sonner";

interface Props {
  movieId: string;
}

export function DeleteButton({ movieId }: Props) {
  const { getAllMovies } = useMovies();
  const navigate = useNavigate();

  async function deleteMovie() {
    const response = window.confirm(
      "Você tem certeza que quer deletar o filme?"
    );

    if (response === true) {
      toast.loading("Aguarde o filme está sendo deletado...");
      try {
        await api.delete(`/movielist/${movieId}`);
        await getAllMovies();
        navigate(-1);
        toast.success("Filme deletado com sucesso!");
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  }

  return (
    <button
      className="text-white mb-4 transition ease-in-out hover:scale-110 duration-300"
      onClick={deleteMovie}
    >
      <Trash2 size="24" />
    </button>
  );
}
