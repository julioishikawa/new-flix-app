import { Link } from "react-router-dom";
import { api } from "../services/api";

interface Movie {
  id: string;
  image: string;
  title: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCardHeader({ movie }: MovieCardProps) {
  const image = `${api.defaults.baseURL}/movielist/${movie.id}/image`;

  return (
    <div className="w-full hover:bg-red-900 duration-700 border-b-2 border-white">
      <Link to={`/watch/${movie.id}`} className="flex items-center">
        <img
          src={image}
          alt={movie.title}
          className="w-20 h-20 object-cover border-r-2"
        />
        <h2 className="text-white text-lg text-center p-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {movie.title}
        </h2>
      </Link>
    </div>
  );
}
