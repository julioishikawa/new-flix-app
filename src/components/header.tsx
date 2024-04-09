import { SearchIcon } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export function Header() {
  const [searchText, setSearchText] = useState("");

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return (
    <div className="flex items-center justify-between px-5 py-3 ">
      <h1 className="text-white">ICONE</h1>
      <div className="flex items-center gap-2">
        <span>
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </span>
        <input
          type="text"
          placeholder="Procurar"
          className="w-full bg-transparent text-xl text-gray-500 font-semibold tracking-tight outline-none placeholder:text-gray-500"
          onChange={handleSearch}
        />
      </div>
      <h1 className="text-white">LOGOUT</h1>
    </div>
  );
}
