import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { X } from "lucide-react";
import { toast } from "sonner";
import { NewCreditCard } from "../components/new-credit-card";
import { ConfirmationModal } from "../components/confirmation-modal"; // Importando o componente de modal de confirmação

interface Subscription {
  id: string;
  type: string;
  name: string;
  price: number;
  benefits: string[];
}

export function SubscriptionWarningPage() {
  const { userId, updateToken } = useAuth();

  const [subOpen, setSubOpen] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [userCreditCards, setUserCreditCards] = useState<any[]>([]);
  const [showCreditCards, setShowCreditCards] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Estado para controlar a abertura do modal de confirmação
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null); // Estado para armazenar a assinatura selecionada

  const openSub = () => {
    setSubOpen(true);
  };

  const closeSub = () => {
    setSubOpen(false);
  };

  const openPaymentForm = () => {
    setPaymentFormOpen(true);
  };

  const closePaymentForm = () => {
    setPaymentFormOpen(false);
    setShowCreditCards(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleCardClick(cardId: string) {
    setUserCreditCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, selected: true }
          : { ...card, selected: false }
      )
    );

    closePaymentForm();
  }

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

  async function fetchUserCreditCards() {
    try {
      const response = await api.get(`/users/${userId}/creditcards`);
      setUserCreditCards(response.data); // Define os cartões de crédito do usuário
    } catch (error) {
      console.error("Erro ao obter os cartões de crédito do usuário:", error);
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

    if (subOpen) {
      fetchSubscriptions();
    }

    if (paymentFormOpen) {
      fetchUserCreditCards(); // Chama a função para buscar os cartões de crédito do usuário quando o formulário de pagamento é aberto
    }
  }, [subOpen, paymentFormOpen]);

  const handleSubscriptionSelection = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsConfirmationModalOpen(true); // Abre o modal de confirmação ao selecionar uma assinatura
  };

  const handleConfirmSubscription = () => {
    setIsConfirmationModalOpen(false); // Fecha o modal de confirmação
    if (selectedSubscription) {
      registerUser(selectedSubscription.type); // Registra o usuário com a assinatura selecionada
    }
  };

  const handleCancelSubscription = () => {
    setIsConfirmationModalOpen(false); // Fecha o modal de confirmação
    openPaymentForm(); // Abre novamente o modal de pagamento
  };

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
            Para ter acesso aos filmes você precisa escolher um{" "}
            <button className="text-red-500 hover:underline" onClick={openSub}>
              plano de assinatura
            </button>
          </p>
        </div>
      </div>

      {subOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="absolute bg-black border-2 text-white w-[50vw] p-7 rounded-lg z-10 flex flex-col animate-slide-down">
            <div className="self-end">
              <X
                className="cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                onClick={closeSub}
              />
            </div>

            <div className="flex flex-col gap-10">
              <h1 className="text-center text-3xl font-bold">
                Escolha um plano
              </h1>
              <ul className="flex gap-5 justify-around pb-5">
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
                      onClick={() => handleSubscriptionSelection(subscription)} // Alteração aqui
                    >
                      Assinar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {paymentFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="absolute bg-black border-2 text-white w-[50vw] p-2 rounded-lg z-10 flex flex-col animate-slide-down">
            <div className="self-end">
              <X
                className="cursor-pointer transition ease-in-out hover:scale-110 duration-300"
                onClick={closePaymentForm}
              />
            </div>

            <div className="flex flex-col gap-7">
              <h1 className="text-center text-3xl font-bold">
                Formas de pagamento
              </h1>

              <div className="flex flex-col gap-5 p-5 m-5 border rounded bg-neutral-800">
                <div className="flex gap-5 justify-around">
                  <button
                    className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out duration-300"
                    onClick={() => {
                      setShowCreditCards(true);
                    }}
                  >
                    Cartão de Crédito
                  </button>

                  <button
                    className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out duration-300"
                    onClick={() => {
                      setShowCreditCards(true);
                    }}
                  >
                    Pix
                  </button>
                </div>

                {showCreditCards && userCreditCards.length > 0 ? (
                  <ul className="p-5 border bg-neutral-700">
                    {userCreditCards.map((card) => (
                      <li
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`mb-4 text-lg cursor-pointer  bg-neutral-900 hover:bg-red-800 rounded p-1 ${
                          card.selected ? "bg-red-900" : ""
                        }`}
                      >
                        **** **** **** {String(card.cardNumber).slice(-4)}
                      </li>
                    ))}

                    <button
                      className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out duration-300"
                      onClick={openModal}
                    >
                      Adicionar Cartão
                    </button>
                  </ul>
                ) : null}

                {showCreditCards && userCreditCards.length === 0 ? (
                  <div className="text-center">
                    <p>Você ainda não possui cartões de crédito cadastrados.</p>
                    <button
                      className="text-white py-2 px-4 mt-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
                      onClick={openModal}
                    >
                      Adicionar Cartão
                    </button>
                  </div>
                ) : null}

                {isModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
                    <div className="bg-black border-2 rounded-lg p-5 relative">
                      <span
                        className="close cursor-pointer text-white absolute top-2 right-2"
                        onClick={closeModal}
                      >
                        <X className="transition ease-in-out hover:scale-110 duration-100" />
                      </span>

                      <NewCreditCard />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message={`Deseja continuar a assinatura com o cartão **** **** **** ${
            selectedSubscription ? String(selectedSubscription.type) : ""
          }?`}
          onConfirm={handleConfirmSubscription}
          onCancel={handleCancelSubscription}
        />
      )}
    </div>
  );
}
