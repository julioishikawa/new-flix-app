import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { BackHomeButton } from "../components/back-home-button";
import avatarPlaceholder from "../assets/avatar_placeholder.png";

export function Profile() {
  const { userName, userEmail, userAvatar, userId } = useAuth();
  const [remainingTime, setRemainingTime] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("Não assinante");

  const avatarURL =
    userAvatar !== "default.jpg" && userAvatar !== null
      ? `${api.defaults.baseURL}/users/${userId}/avatar`
      : avatarPlaceholder;

  const [showEmail, setShowEmail] = useState(false);

  const toggleShowEmail = () => {
    setShowEmail((prevState) => !prevState);
  };

  useEffect(() => {
    async function fetchRemainingTime() {
      try {
        const response = await api.get(`/subscriptions/${userId}`);
        const { remainingTime, subscriptionType } = response.data;
        setRemainingTime(remainingTime);
        setSubscriptionType(subscriptionType);
      } catch (error) {
        console.error("Erro ao obter o tempo restante da assinatura:", error);
      }
    }

    fetchRemainingTime();
  }, []);

  return (
    <div className="bg-black min-h-screen p-10 flex flex-col justify-center items-center">
      <div className="max-w-5xl bg-neutral-800 p-5 rounded-lg shadow-lg">
        <BackHomeButton />

        <form>
          <div className="px-5 pb-5 h-full">
            <h1 className="text-white text-2xl mb-4">Perfil de {userName}</h1>

            <div className="flex items-center p-3 mb-5 bg-neutral-700 rounded">
              <label className="flex items-center justify-center bg-neutral-900 text-white p-2 rounded">
                <img
                  src={avatarURL}
                  alt="Preview"
                  className="max-w-56 h-auto object-cover rounded"
                />
              </label>

              <div className="min-w-96 flex flex-col justify-center p-3">
                <h2 className="mb-1 text-white">Email</h2>

                <div className="relative w-full mb-4 bg-black rounded">
                  <input
                    type={showEmail ? "text" : "password"}
                    value={userEmail ?? ""}
                    className=" bg-black text-white p-1 rounded"
                    disabled
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-2 text-white"
                    onClick={toggleShowEmail}
                  >
                    {showEmail ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <h2 className="mb-1 text-white">Senha</h2>
                <div className="relative w-full mb-4 bg-black rounded">
                  <input
                    type="password"
                    value="12345678900987654321"
                    className="bg-black text-white p-1  rounded"
                    disabled
                  />
                </div>

                <Link
                  to={`/updateprofile/${userId}`}
                  className="text-white text-right hover:text-gray-300 focus:outline-none"
                >
                  Editar perfil
                </Link>
              </div>
            </div>

            <h1 className="text-white text-2xl mb-4">Assinatura</h1>
            <div className="flex flex-col gap-3 p-3 bg-neutral-700 rounded">
              <p className="text-white">
                Tipo de Assinatura:{" "}
                <span className="font-bold text-red-200">
                  {subscriptionType}
                </span>
              </p>
              <p className="text-white">
                Tempo Restante da Assinatura: {remainingTime}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
