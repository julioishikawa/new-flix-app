import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

interface Movie {
  id: string;
  image: string;
  title: string;
  gender: string;
  description: string;
  content: {
    URL: string;
  };
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const {
    content: { URL },
  } = movie;

  const imageUrl = `${api.defaults.baseURL}/movielist/${movie.id}/image`;

  const handleMouseEnter = () => {
    setShowDescription(true);
    setShowVideo(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
    setShowVideo(false);
  };

  return (
    <div
      className="relative transition duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-center">
        <Link to={`/movielist/${movie.id}`}>
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-28 h-28 object-cover"
          />
          <h2 className="text-white">{movie.title}</h2>
        </Link>
      </div>

      {showVideo && (
        <div className="w-96 h-56 flex items-center justify-center z-10">
          <div className="absolute inset-0 flex flex-col items-center bg-gray-900 bg-opacity-75 rounded">
            <iframe
              className="w-full h-full"
              src={URL} // Adiciona os parâmetros para autoplay e mute
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {showDescription && (
              <p className="text-white p-4">{movie.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
