import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "sonner";
import { useMovies } from "../hooks/movies";
import { BackButton } from "../components/back-button";

export function NewMovie() {
  const { getAllMovies } = useMovies();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [demoContentURL, setDemoContentURL] = useState("");
  const [contentURL, setContentURL] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validGenres = [
    "Ação",
    "Comédia",
    "Drama",
    "Ficção Científica",
    "Suspense",
    "Terror",
  ];

  function handleGenreClick(genre: string) {
    const updatedGenres = genres.includes(genre)
      ? genres.filter((g) => g !== genre)
      : [...genres, genre];

    setGenres(updatedGenres);
  }

  function handleImage() {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    return formData;
  }

  async function handleNewMovie() {
    try {
      const movieData = {
        title,
        image,
        genres,
        description,
        demo_content: { trailer_URL: demoContentURL },
        content: { URL: contentURL },
      };

      const { data } = await api.post("/movielist/newmovie", movieData);

      if (!image) {
        return toast.error("Você precisa definir uma imagem para o filme");
      }

      if (image) {
        const imageFormData = handleImage();
        await api.patch(`/movielist/upload/${data.movieId}`, imageFormData);
      }

      navigate("/");
      toast.success("Filme criado com sucesso!");
      getAllMovies();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Não foi possível criar o filme.");
      }
    }
  }

  return (
    <div className="bg-black min-h-screen p-10 flex flex-col justify-center items-center">
      <form
        encType="multipart/form-data"
        className="bg-neutral-800 p-5 rounded-lg shadow-lg"
      >
        <BackButton />

        <div className="px-5 pb-5 h-full">
          <h1 className="text-white text-2xl mb-4">Adicionar filme</h1>

          <div className="mb-4">
            <p className="text-white ">Imagem do filme</p>
            <label className="flex items-center justify-center cursor-pointer bg-neutral-900 text-white p-2 mt-2 rounded-md">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-52 h-auto rounded-md"
                />
              ) : (
                "Selecione uma imagem"
              )}
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    const imageURL = URL.createObjectURL(file);
                    setImagePreview(imageURL);
                    setImage(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-4">
            <p className="text-white">Título</p>
            <input
              placeholder="Ex.: Titanic"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <p className="text-white">Gênero</p>
            <div className="flex flex-wrap mt-2">
              {validGenres.map((genreOption) => (
                <button
                  key={genreOption}
                  type="button"
                  className={`bg-neutral-900 text-white p-2 rounded-md mr-2 mb-2 ${
                    genres.includes(genreOption)
                      ? "transition ease-in-out delay-150 bg-red-500 -translate-y-1 duration-300"
                      : "transition ease-in-out delay-150 duration-300"
                  }`}
                  onClick={() => handleGenreClick(genreOption)}
                >
                  {genreOption}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-white">Descrição</p>
            <textarea
              placeholder="Fale brevemente sobre o filme"
              onChange={(e) => setDescription(e.target.value)}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <p className="text-white">URL do trailer</p>
            <input
              placeholder="Ex.: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              type="text"
              onChange={(e) => setDemoContentURL(e.target.value)}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <p className="text-white">URL do filme</p>
            <input
              placeholder="Ex.: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              type="text"
              onChange={(e) => setContentURL(e.target.value)}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <button
            type="button"
            onClick={handleNewMovie}
            className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
          >
            Criar Filme
          </button>
        </div>
      </form>
    </div>
  );
}
