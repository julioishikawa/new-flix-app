import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useMovies } from "../hooks/movies";
import { toast } from "sonner";
import { ConfirmationModal } from "./confirmation-modal";

interface Props {
  movieId: string;
}

export function DeleteButton({ movieId }: Props) {
  const { getAllMovies } = useMovies();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function handleDeleteConfirm() {
    setShowConfirmation(false);
    toast.loading("Aguarde o filme está sendo deletado...");

    try {
      await api.delete(`/movielist/${movieId}`);
      await getAllMovies();

      navigate(-1);

      toast.success("Filme deletado com sucesso!");
      toast.dismiss(); // Remover mensagem de carregamento
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }

  function handleDeleteCancel() {
    setShowConfirmation(false);
  }

  return (
    <>
      <button
        className="text-white mb-4 transition ease-in-out hover:scale-110 duration-300"
        onClick={() => setShowConfirmation(true)}
      >
        <Trash2 size="24" />
      </button>
      {showConfirmation && (
        <ConfirmationModal
          message="Você tem certeza que quer deletar o filme?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
}
