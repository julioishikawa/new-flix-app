import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import MovieCard from "./movie-card";

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

interface CategoryProps {
  title: string;
  movies: Movie[];
}

export function MovieCategory({ title, movies }: CategoryProps) {
  return (
    <div>
      <h2 className="text-white text-xl font-bold">{title}</h2>

      <Swiper
        className="w-full relative z-0"
        wrapperClass="gap-7 z-0"
        slidesPerView="auto"
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="w-fit mb-8">
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
