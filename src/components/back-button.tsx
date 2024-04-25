import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  return (
    <button
      className="text-white mb-4 transition ease-in-out hover:scale-110 duration-300"
      onClick={goBack}
    >
      <ArrowLeft size="24" />
    </button>
  );
}
