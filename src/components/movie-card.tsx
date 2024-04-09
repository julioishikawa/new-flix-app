import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div className="tools">
        <div
          className=""
          role="button"
          onClick={() => navigate(`/editmovie/${movie.id}`)}
        />
      </div>

      <div>
        <Link to={`/movielist/${movie.id}`}>
          <img src={movie.image} alt={movie.title} />
          <h2>{`${movie.title} >`}</h2>
        </Link>
        {showDescription && <p className="description">{movie.description}</p>}
      </div>
    </div>
  );
}
