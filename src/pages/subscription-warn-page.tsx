import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

interface Subscription {
  id: string;
  type: string;
  name: string;
  price: number;
  benefits: string[];
}

export function SubscriptionWarningPage() {
  const { userId, updateToken } = useAuth();
  const navigate = useNavigate();

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
      console.log("Token recebido da resposta:", token);

      if (token) {
        updateToken(token);
      }

      console.log(`Usuário registrado com sucesso: ${userId}`);
      navigate("/");
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
      <Header />

      <div className="relative flex justify-center items-center h-[90vh]">
        <div className="text-white">
          <h1>Você ainda não é inscrito D:</h1>
          <p>
            Clique aqui para se{" "}
            <button
              className="text-red-500 hover:underline"
              onClick={openModal}
            >
              inscrever
            </button>
          </p>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="absolute bg-white p-5 rounded-lg z-10">
            <button onClick={closeModal}>X</button>
            <h1>Escolha um plano:</h1>
            <ul>
              {subscriptions.map((subscription) => (
                <li key={subscription.id}>
                  <p>{subscription.name}</p>
                  <p>{subscription.price}</p>
                  {subscription.benefits.map((benefit, index) => (
                    <p key={index}>{benefit}</p>
                  ))}
                  <button onClick={() => registerUser(subscription.type)}>
                    Selecionar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
