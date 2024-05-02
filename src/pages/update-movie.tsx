import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "sonner";
import { useMovies } from "../hooks/movies";
import { BackButton } from "../components/back-button";
import { LoadingSpinnerButton } from "../components/loading-spinner-button";

export function UpdateMovie() {
  const { movieId } = useParams();
  const { getAllMovies } = useMovies();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [demoContentURL, setDemoContentURL] = useState("");
  const [contentURL, setContentURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleUpdateMovie(e: any) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const movieData = {
        title,
        image,
        genres,
        description,
        demo_content: { trailer_URL: demoContentURL },
        content: { URL: contentURL },
      };

      await api.put(`/movielist/editmovie/${movieId}`, movieData);

      if (image) {
        const imageFormData = handleImage();
        await api.patch(`/movielist/upload/${movieId}`, imageFormData);
      }

      setIsLoading(false);
      toast.success("Filme atualizado com sucesso!");
      getAllMovies();
      navigate("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Não foi possível atualizar o filme.");
      }
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handleUpdateMovie(e);
    }
  }

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await api.get(`/movielist/${movieId}`);
        const movie = data.movie;

        const imageMovie = `${api.defaults.baseURL}/movielist/${movie.id}/image`;

        setImagePreview(imageMovie);
        setTitle(movie.title);
        setGenres(movie.genres);
        setDescription(movie.description);
        setDemoContentURL(movie.demo_content.trailer_URL);
        setContentURL(movie.content.URL);
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
        toast.error("Erro ao buscar filme.");
      }
    }

    fetchMovie();
  }, [movieId]);

  return (
    <div className="bg-black min-h-screen p-10 flex flex-col justify-center items-center">
      <div className="bg-neutral-800 p-5 rounded-lg shadow-lg">
        <BackButton />

        <form encType="multipart/form-data">
          <div className="px-5 pb-5 h-full">
            <h1 className="text-white text-2xl mb-4">Editar filme</h1>

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
              />
            </div>

            <div className="mb-4 px-5 pb-5 h-full">
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
                    onKeyDown={handleKeyDown}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-neutral-900 text-white p-2 mt-2 rounded-md w-full h-32 resize-none overflow-auto  scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-transparent"
              />
            </div>

            <div className="mb-4">
              <p className="text-white">URL do trailer</p>
              <input
                placeholder="Ex.: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                type="text"
                value={demoContentURL}
                onChange={(e) => setDemoContentURL(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
              />
            </div>

            <div className="mb-4">
              <p className="text-white">URL do filme</p>
              <input
                placeholder="Ex.: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                type="text"
                value={contentURL}
                onChange={(e) => setContentURL(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
              />
            </div>

            <button
              type="button"
              onClick={handleUpdateMovie}
              className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
            >
              {isLoading ? <LoadingSpinnerButton /> : "Atualizar Filme"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
