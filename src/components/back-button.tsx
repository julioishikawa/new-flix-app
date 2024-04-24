import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  return (
    <button className="text-white mb-4" onClick={goBack}>
      <ArrowLeft size="24" />
    </button>
  );
}
