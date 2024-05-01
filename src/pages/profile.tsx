import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../hooks/auth";
import { api } from "../services/api";
import avatarPlaceholder from "../assets/avatar_placeholder.png";
import { BackButton } from "../components/back-button";

export function Profile() {
  const { userName, userEmail, userAvatar, userId } = useAuth();
  const navigate = useNavigate();

  const avatarURL =
    userAvatar !== "default.jpg" && userAvatar !== null
      ? `${api.defaults.baseURL}/users/${userId}/avatar`
      : avatarPlaceholder;

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarURL);
  const [name, setName] = useState<string>(userName || "");
  const [email, setEmail] = useState<string>(userEmail || "");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  function handleAvatar() {
    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    return formData;
  }

  async function handleUpdateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const userData = {
        name,
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      };

      await api.put(`/users/${userId}`, userData);

      if (avatar) {
        const imageFormData = handleAvatar();
        await api.patch(`/users/upload/${userId}`, imageFormData);
      }

      setIsLoading(false);
      toast.success("Usuário atualizado com sucesso!");
      navigate("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Não foi possível atualizar o usuário.");
      }
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handleUpdateUser(e);
    }
  }

  return (
    <div className="bg-black min-h-screen p-10 flex flex-col justify-center items-center">
      <div className="bg-neutral-800 p-5 rounded-lg shadow-lg">
        <BackButton />

        <h1 className="text-white text-2xl mb-4">Perfil</h1>
        <form
          onSubmit={handleUpdateUser}
          className="flex flex-col items-center justify-center"
        >
          <div className="mb-4 px-5 pb-5 h-full">
            <label className="flex items-center justify-center cursor-pointer bg-neutral-900 text-white p-2 mt-2 rounded-md">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="max-w-52 h-auto rounded-md"
                />
              ) : (
                "Selecione uma imagem"
              )}
              <input
                type="file"
                name="avatar"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    const avatarURL = URL.createObjectURL(file);
                    setAvatarPreview(avatarURL);
                    setAvatar(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-neutral-900 text-white p-2 rounded-md w-full mb-4"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-neutral-900 text-white p-2 rounded-md w-full mb-4"
          />

          <input
            type="password"
            id="password"
            placeholder="Senha antiga"
            onChange={(e) => setOldPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-neutral-900 text-white p-2 rounded-md w-full mb-4"
          />

          <input
            type="password"
            id="password"
            placeholder="Nova senha"
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-neutral-900 text-white p-2 rounded-md w-full mb-4"
          />

          <input
            type="password"
            id="password"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-neutral-900 text-white p-2 rounded-md w-full mb-4"
          />

          <button
            type="submit"
            className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
          >
            {isLoading ? "Carregando..." : "Atualizar Usuário"}
          </button>
        </form>
      </div>
    </div>
  );
}
