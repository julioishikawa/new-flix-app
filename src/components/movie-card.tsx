import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

interface Movie {
  id: string;
  image: string;
  title: string;
  genres: string[];
  description: string;
  demo_content: {
    trailer_URL: string;
  };
  rating: number;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const timeoutRef = useRef<any | null>(null);

  const {
    demo_content: { trailer_URL },
    rating,
  } = movie;

  const imageUrl = `${api.defaults.baseURL}/movielist/${movie.id}/image`;

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDescription(true);
      setShowVideo(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowDescription(false);
    setShowVideo(false);
  };

  return (
    <div
      className="relative transition duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/movielist/${movie.id}`}>
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-28 h-28 object-cover"
        />

        <h2 className="text-white text-lg mt-2">{movie.title}</h2>
      </Link>

      {showVideo && (
        <div className="min-w-96 min-h-56 z-10 ">
          <div className="absolute -inset-1 flex flex-col bg-gray-900 bg-opacity-75 rounded">
            <iframe
              className="min-w-96 min-h-56"
              src={trailer_URL}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            {showDescription && (
              <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                <h2 className="text-white px-4 pt-4">
                  {rating}% gostaram desse filme
                </h2>
                <p className="text-white p-4">{movie.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
