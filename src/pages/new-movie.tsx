import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function NewMovie() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [contentURL, setContentURL] = useState("");

  function handleImage() {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    console.log("Image FormData:", formData);
    return formData;
  }

  async function handleNewMovie() {
    try {
      const movieData = {
        title,
        gender,
        description,
        content: { URL: contentURL },
      };

      console.log("Movie Data:", movieData);

      const { data } = await api.post("/movielist/newmovie", movieData);

      console.log("Response Data:", data);

      if (image) {
        const imageFormData = handleImage();
        await api.patch(`/movielist/upload/${data.movieId}`, imageFormData);
      }

      navigate("/");
      alert("Filme criado com sucesso!");
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Não foi possível criar o filme.");
      }
    }
  }

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <form
        method="post"
        encType="multipart/form-data"
        className="bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-white text-2xl mb-4">Adicionar filme</h1>
        <div className="mb-4">
          <p className="text-white">Imagem do filme</p>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                const file = files[0];
                console.log("File selected:", file);
                setImage(file);
              }
            }}
            className="bg-gray-900 text-white p-2 rounded-md mt-2"
          />
        </div>

        <div className="mb-4">
          <p className="text-white">Título</p>
          <input
            placeholder="Ex.: Titanic"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-900 text-white p-2 rounded-md w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <p className="text-white">Gênero</p>
          <input
            placeholder="Ex.: Drama, Ação"
            type="text"
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-900 text-white p-2 rounded-md w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <p className="text-white">Descrição</p>
          <textarea
            placeholder="Fale brevemente sobre o filme"
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-900 text-white p-2 rounded-md w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <p className="text-white">URL do conteúdo</p>
          <input
            placeholder="Ex.: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            type="text"
            onChange={(e) => setContentURL(e.target.value)}
            className="bg-gray-900 text-white p-2 rounded-md w-full mt-2"
          />
        </div>

        <button
          type="button"
          onClick={handleNewMovie}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Criar Filme
        </button>
      </form>
    </div>
  );
}
