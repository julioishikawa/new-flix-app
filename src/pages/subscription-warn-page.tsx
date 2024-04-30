import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Subscription {
  id: string;
  type: string;
  name: string;
  price: number;
  benefits: string[];
}

export function SubscriptionWarningPage() {
  const { userId, updateToken } = useAuth();

  const [modalOpen, setModalOpen] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function registerUser(type: string) {
    try {
      const response = await api.post(
        `/subscriptions/select-subscription/${type}`,
        {
          userId: userId,
        }
      );

      const { token } = response.data;

      if (token) {
        updateToken(token);
      }

      window.location.reload();
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
    }
  }

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await api.get("/subscriptions");
        setSubscriptions(response.data.subscriptions);
      } catch (error) {
        console.error("Erro ao buscar as assinaturas:", error);
      }
    };

    if (modalOpen) {
      fetchSubscriptions();
    }
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-black">
      <Header
        filterMoviesByCategory={function (): void {
          toast.error("Você não é um assinante!");
        }}
      />

      <div className="relative flex justify-center items-center h-[90vh]">
        <div className="text-white text-xl">
          <h1>Você ainda não é um assinante D:</h1>
          <p>
            para ter acesso aos filmes você precisa escolher um{" "}
            <button
              className="text-red-500 hover:underline"
              onClick={openModal}
            >
              plano de assinatura
            </button>
          </p>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="absolute bg-neutral-800 text-white w-[50vw] p-7 rounded-lg z-10 flex flex-col animate-slide-down">
            <div className="self-end">
              <X
                className="cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                onClick={closeModal}
              />
            </div>

            <div className="flex flex-col gap-14">
              <h1 className="text-center text-3xl font-bold">
                Escolha um plano
              </h1>
              <ul className="flex gap-5 justify-around">
                {subscriptions.map((subscription) => (
                  <li
                    key={subscription.id}
                    className="h-full flex flex-col gap-5 p-5 text-lg border-2 rounded bg-neutral-700 transition ease-in-out delay-150 hover:scale-105 duration-300"
                  >
                    <p className="text-2xl">{subscription.name}</p>
                    <p>{`R$ ${subscription.price}`}</p>

                    {subscription.benefits.map((benefit, index) => (
                      <p key={index}>{benefit}</p>
                    ))}
                    <button
                      className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
                      onClick={() => registerUser(subscription.type)}
                    >
                      Selecionar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
