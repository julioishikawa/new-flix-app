import { Link } from "react-router-dom";
import { api } from "../services/api";

interface Movie {
  id: string;
  image: string;
  title: string;
  gender: string;
  description: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCardHeader({ movie }: MovieCardProps) {
  const image = `${api.defaults.baseURL}/movielist/${movie.id}/image`;

  return (
    <div className="w-full hover:bg-slate-700 border-b-2 border-gray-500 ">
      <Link to={`/movielist/${movie.id}`} className="flex items-center">
        <img src={image} alt={movie.title} className="w-20 h-20 object-cover" />
        <h2 className="text-white text-xl flex-grow text-center">
          {movie.title}
        </h2>
      </Link>
    </div>
  );
}
