import { X } from "lucide-react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-black border-2 text-white w-[50vw] p-2 rounded-lg z-10 flex flex-col animate-slide-down">
        <div className="self-end">
          <X
            className="cursor-pointer transition ease-in-out hover:scale-110 duration-300"
            onClick={onCancel}
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-lg text-center px-5">{message}</p>

          <div className="flex flex-col justify-center md:flex-row gap-5 px-5 mb-5">
            <button
              className="text-white py-2 md:px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out duration-300"
              onClick={onConfirm}
            >
              Confirmar
            </button>
            <button
              className="text-white py-2 md:px-4 bg-red-800 rounded hover:bg-red-900 transition ease-in-out duration-300"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
