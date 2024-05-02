import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackHomeButton() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <button
      className="text-white mb-4 transition ease-in-out hover:scale-110 duration-300"
      onClick={goHome}
    >
      <ArrowLeft size="24" />
    </button>
  );
}
