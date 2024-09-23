import "./Hero.css";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Img from "../Img/Img";

const Hero = ({ games }) => {

  const bestGames = games.results.filter((game) => game.rating >= 4).sort((a,b)=>b.rating - a.rating);  

  return (
    <header className="myHero">
      
      <Swiper key={bestGames.slugs}
        slidesPerView={1}
        spaceBetween={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bestGames.map((game) => {
          return (
            
            <SwiperSlide key={game.id}>
              <Img src={game.background_image} alt="" key={game.id} />
            </SwiperSlide>
            
          );
          
        })}
      </Swiper>
    
    </header>
  );
};

export default Hero;

