import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieCardTopTen from "./movie-card-top-ten";

interface Movie {
  id: string;
  image: string;
  title: string;
  genres: string[];
  description: string;
  demo_content: {
    trailer_URL: string;
  };
}

interface CategoryProps {
  title: string;
  movies: Movie[];
}

export function MovieCategoryTopTen({ title, movies }: CategoryProps) {
  const swiperRef = useRef<any>(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handlePrevClick = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current.swiper.slideNext();
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
      checkNavVisibility();
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-2 pt-6 pl-14">{title}</h2>

      <div className="px-14 relative z-0">
        <Swiper
          className="pt-6 px-6 pb-4 md:p-6  z-0 bg-neutral-950 rounded"
          wrapperClass="min-w-96 z-0"
          slidesPerView="auto"
          freeMode={true}
          ref={swiperRef}
        >
          {movies.map((movie, index) => (
            <SwiperSlide
              key={movie.id}
              className={`w-fit ${isSmallScreen ? "md:w-1/2 h-56" : ""} ${
                index !== movies.length - 1 ? "mr-12" : ""
              }`}
            >
              <MovieCardTopTen movie={movie} position={index + 1} />
            </SwiperSlide>
          ))}
        </Swiper>

        {window.innerWidth >= 768 && isNavVisible && (
          <>
            <div
              className="swiper-button-prev absolute text-white cursor-pointer"
              onClick={handlePrevClick}
            ></div>

            <div
              className="swiper-button-next absolute text-white cursor-pointer"
              onClick={handleNextClick}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}
