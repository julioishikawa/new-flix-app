import { Header } from "../components/header";

export function SubscriptionWarningPage() {
  return (
    <div>
      <Header />
      <div className="bg-black flex flex-col justify-center items-center text-white h-screen">
        <h1>Você ainda não é inscrito!</h1>
        <p>clique aqui para se inscrever</p>
      </div>
    </div>
  );
}
