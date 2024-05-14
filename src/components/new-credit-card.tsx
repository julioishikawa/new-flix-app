import { useState, ChangeEvent } from "react";
import { api } from "../services/api";
import { toast } from "sonner";
import { LoadingSpinnerButton } from "../components/loading-spinner-button";
import { useAuth } from "../hooks/auth";

export function NewCreditCard() {
  const { userId } = useAuth();

  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function formatCardNumber(value: string): string {
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiration(value: string): string {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/[^\d]/g, "");

    // Verifica se o valor é vazio ou tem menos de 3 caracteres
    if (cleanedValue === "" || cleanedValue.length < 3) {
      return cleanedValue; // Retorna o valor sem formatação
    }

    // Extrai o mês e o ano
    const month = cleanedValue.slice(0, 2);
    const year = cleanedValue.slice(2, 4);

    return `${month}/${year}`;
  }

  function handleCardNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatCardNumber(e.target.value);

    setCardNumber(formattedValue.slice(0, 19));
  }

  function handleExpirationChange(e: ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatExpiration(e.target.value);
    setExpiration(formattedValue);
  }

  function handleCvvChange(e: ChangeEvent<HTMLInputElement>) {
    setCvv(e.target.value.slice(0, 3));
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handleNewCreditCard();
    }
  }

  async function handleNewCreditCard() {
    try {
      setIsLoading(true);

      const creditCardData = {
        cardName,
        cardNumber,
        expiration,
        cvv: parseInt(cvv), // Convertendo CVV para número
      };

      await api.post(`/users/${userId}/new-cc`, creditCardData);

      setIsLoading(false);
      toast.success("Cartão de crédito criado com sucesso!");
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Não foi possível criar o cartão de crédito.");
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-black p-5 flex flex-col justify-center items-center">
      <div className="bg-neutral-800 p-5 rounded-lg shadow-lg">
        <form>
          <h1 className="text-white font-bold text-lg md:text-2xl mb-4">
            Novo Cartão de Crédito
          </h1>

          <div className="flex">
            <span className="relative text-xs text-white font-bold ">
              *Crie um cartão fictício
              <span className="animate-ping w-3 h-3 absolute ml-2 rounded-full bg-red-700 opacity-100"></span>
            </span>
          </div>

          <div className="my-4">
            <p className="text-white">Número do Cartão</p>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <p className="text-white">Nome no Cartão</p>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <p className="text-white">Data de Expiração (MM/YY)</p>
            <input
              type="text"
              value={expiration}
              onChange={handleExpirationChange}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <p className="text-white">CVV</p>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              className="bg-neutral-900 text-white p-2 rounded-md w-full mt-2"
            />
          </div>

          <button
            type="button"
            onClick={handleNewCreditCard}
            onKeyDown={handleKeyDown}
            className="text-white py-2 px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out hover:scale-105 duration-300"
          >
            {isLoading ? <LoadingSpinnerButton /> : "Criar Cartão"}
          </button>
        </form>
      </div>
    </div>
  );
}
