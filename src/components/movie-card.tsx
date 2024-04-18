import { useState } from "react";
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

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  const image = `${api.defaults.baseURL}/movielist/${movie.id}/image`;

  return (
    <div
      className="card"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div>
        <Link to={`/movielist/${movie.id}`}>
          <img src={image} alt={movie.title} className="w-20 h-20" />
          <h2 className="text-white">{`${movie.title}`}</h2>
        </Link>
        {showDescription && <p className="text-white">{movie.description}</p>}
      </div>
    </div>
  );
}
