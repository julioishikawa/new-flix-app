import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import MovieCard from "./movie-card";

interface Movie {
  id: string;
  image: string;
  title: string;
  gender: string;
  description: string;
}

interface CategoryProps {
  title: string;
  movies: Movie[];
}

export function MovieCategory({ title, movies }: CategoryProps) {
  return (
    <div>
      <h2>{title}</h2>

      <Swiper
        slidesPerView="auto"
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
