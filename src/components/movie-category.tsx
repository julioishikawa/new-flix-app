import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

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
  const swiperRef = useRef<any>(null); // Use uma ref para o componente Swiper
  const [isNavVisible, setIsNavVisible] = useState(false); // Estado para controlar a visibilidade dos botões de navegação

  const handlePrevClick = () => {
    swiperRef.current.swiper.slidePrev(); // Chame o método slidePrev() do Swiper ao clicar no botão prev
  };

  const handleNextClick = () => {
    swiperRef.current.swiper.slideNext(); // Chame o método slideNext() do Swiper ao clicar no botão next
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    const checkNavVisibility = () => {
      setIsNavVisible(
        swiperInstance.isBeginning === false || swiperInstance.isEnd === false
      );
    };

    swiperInstance.on("reachBeginning", checkNavVisibility);
    swiperInstance.on("reachEnd", checkNavVisibility);
    checkNavVisibility();

    const handleResize = () => {
      checkNavVisibility(); // Atualiza a visibilidade dos botões quando a janela é redimensionada
    };

    window.addEventListener("resize", handleResize); // Adiciona o ouvinte de evento para redimensionamento da janela

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o ouvinte de evento quando o componente é desmontado
    };
  }, []);

  return (
    <div className="px-14 relative z-0">
      <h2 className="text-white text-xl font-bold pt-5">{title}</h2>

      <Swiper
        className="p-5 z-0"
        wrapperClass="z-0"
        slidesPerView="auto"
        freeMode={true}
        ref={swiperRef}
      >
        {movies.map((movie, index) => (
          <SwiperSlide
            key={movie.id}
            className={`w-fit ${index !== movies.length - 1 ? "mr-16" : ""}`}
          >
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isNavVisible && (
        <>
          <div
            className="swiper-button-prev absolute top-32 text-white cursor-pointer"
            onClick={handlePrevClick}
          ></div>

          <div
            className="swiper-button-next absolute top-32 text-white cursor-pointer"
            onClick={handleNextClick}
          ></div>
        </>
      )}
    </div>
  );
}
