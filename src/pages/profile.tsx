import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Trash2, X } from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { BackHomeButton } from "../components/back-home-button";
import avatarPlaceholder from "../assets/avatar_placeholder.png";
import { toast } from "sonner";
import { NewCreditCard } from "../components/new-credit-card";
import { ConfirmationModal } from "../components/confirmation-modal";

export function Profile() {
  const { userName, userEmail, userAvatar, userId } = useAuth();
  const [remainingTime, setRemainingTime] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("Não assinante");
  const [userCreditCards, setUserCreditCards] = useState<
    { id: string; cardNumber: number; expiration: number; cvv: number }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<{
    [key: string]: boolean;
  }>({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const avatarURL =
    userAvatar !== "default.jpg" && userAvatar !== null
      ? `${api.defaults.baseURL}/users/${userId}/avatar`
      : avatarPlaceholder;

  const [showEmail, setShowEmail] = useState(false);

  const toggleShowEmail = () => {
    setShowEmail((prevState) => !prevState);
  };

  async function handleDeleteCardConfirm(cardId: string) {
    try {
      await api.delete(`/users/${userId}/${cardId}`);

      const updatedCards = userCreditCards.filter((card) => card.id !== cardId);

      setUserCreditCards(updatedCards);
      toast.success("Cartão deletado com sucesso!");

      setShowConfirmation((prevState) => ({
        ...prevState,
        [cardId]: false,
      }));
    } catch (error) {
      console.error("Erro ao excluir o cartão de crédito:", error);
    }
  }

  function handleDeleteCardCancel(cardId: string) {
    setShowConfirmation((prevState) => ({
      ...prevState,
      [cardId]: false,
    }));
  }

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

    async function fetchUserCreditCards() {
      try {
        const response = await api.get(`/users/${userId}/credit-cards`);
        const cards = response.data.map((card: any) => ({
          id: card.id,
          cardNumber: card.cardNumber,
          expiration: card.expiration,
          cvv: card.cvv,
        }));
        setUserCreditCards(cards);
      } catch (error) {
        console.error("Erro ao obter os cartões de crédito do usuário:", error);
      }
    }

    fetchRemainingTime();
    fetchUserCreditCards();
  }, [userId]);

  return (
    <div className="bg-black w-full min-h-screen p-10 flex justify-center items-center">
      <div className="w-[1024px] bg-neutral-800 p-5 rounded-lg shadow-lg">
        <BackHomeButton />

        <div>
          <div className="px-5 pb-5 h-full">
            <h1 className="text-white text-2xl mb-4">Perfil de {userName}</h1>

            <div className="flex flex-col sm:flex-row items-center p-3 mb-5 bg-neutral-700 rounded">
              <label className="w-full flex items-center justify-center bg-neutral-900 text-white p-2 rounded">
                <img
                  src={avatarURL}
                  alt="Preview"
                  className="max-w-56 h-auto object-cover rounded"
                />
              </label>

              <div className="w-full flex flex-col justify-center px-3 pt-3">
                <h2 className="mb-1 text-white">Email</h2>

                <div className="relative w-full mb-4 bg-black rounded">
                  <input
                    type={showEmail ? "text" : "password"}
                    value={userEmail ?? ""}
                    className="bg-black text-white p-1 rounded w-full"
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
                    className="bg-black text-white p-1 rounded w-full"
                    disabled
                  />
                </div>

                <Link
                  to={`/updateprofile/${userId}`}
                  className="text-white text-right hover:text-gray-300 focus:outline-none self-end"
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
              <p className="text-white">Tempo Restante: {remainingTime}</p>
            </div>

            <h1 className="text-white text-2xl my-4">Métodos de pagamento</h1>
            <div className="flex flex-col gap-3 p-3 bg-neutral-700 rounded w-full">
              <h2 className="text-white font-bold">Cartões de crédito</h2>
              {userCreditCards.map((card, index) => (
                <div
                  key={index}
                  className="text-white flex justify-between bg-black p-2 rounded"
                >
                  <p className="text-justify text-lg">
                    **** **** **** {String(card.cardNumber).slice(-4)}
                  </p>
                  <button
                    className="text-red-500"
                    onClick={() =>
                      setShowConfirmation((prevState) => ({
                        ...prevState,
                        [card.id]: true,
                      }))
                    }
                  >
                    <Trash2
                      size={20}
                      className="transition ease-in-out hover:scale-110 duration-300"
                    />
                  </button>

                  {showConfirmation[card.id] && (
                    <ConfirmationModal
                      message={`Você tem certeza que deseja deletar o cartão que terminar com ${String(
                        card.cardNumber
                      ).slice(-4)}`}
                      onConfirm={() => handleDeleteCardConfirm(card.id)}
                      onCancel={() => handleDeleteCardCancel(card.id)}
                    />
                  )}
                </div>
              ))}

              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
                  <div className="bg-black border-2 rounded-lg p-5 relative">
                    <span
                      className="close cursor-pointer text-white absolute top-3 right-3"
                      onClick={closeModal}
                    >
                      <X className="transition ease-in-out hover:scale-110 duration-100" />
                    </span>
                    <NewCreditCard />
                  </div>
                </div>
              )}

              <Link to="#" onClick={openModal}>
                <button className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out duration-300 w-full sm:w-auto">
                  Adicionar cartão
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
