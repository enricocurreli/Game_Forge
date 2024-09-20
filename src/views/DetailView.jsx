import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ChangePage } from "../context/ChangePage";
import Section from "../components/Section/Section";
import Article from "../components/Section/Article";
import Img from "../components/Img/Img";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Title from "../components/Title/Title";
import Paragraph from "../components/Paragraph/Paragraph";
import Card from "../components/Card/Card";
import useFetch from "../hooks/useFetch";
import { UserContext } from "../context/UserContext";
import Button from "../components/Button/Button";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import supabase from "../database/supabase";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection";


const DetailView = () => {

  const game = useLoaderData();
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
 

  // SCREENSHOT
  let url = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`;
  const { data: screenshots, loading: loadingScreen } = useFetch(url);
 
  // DLC
  let url_DLC = `https://api.rawg.io/api/games/${id}/additions?key=${API_KEY}`;
  const { data: dlc, loading: loadingDLC } = useFetch(url_DLC);
  // STORE
  let url_store = `https://api.rawg.io/api/games/${id}/stores?key=${API_KEY}`;
  const { data: stores, loading: loadingStores } = useFetch(url_store);

   // USER CONTEXT
  const { profile } = useContext(UserContext);

  const [favorite, setFavorite] = useState(false);

  const getFavorite = async ()=>{


    let {data: favorites} = await supabase
    .from('favourites')
    .select("*")
    .eq("profile_id", profile.id)
    .eq("game_id", game.id);
    
    if (favorites.length > 0) {
        setFavorite(true)
    } 
    
  }

  useEffect(()=>{
    getFavorite();
  }, [])
  

  const handleFavorite = async () => {
    await setFavorite((prev) => !prev);

    if (!favorite) {
      await supabase
        .from("favourites")
        .insert([
          { profile_id: profile.id , game_id: game.id, game_name: game.name }
        ])
        .select();
    } else {
        
        await supabase
        .from("favourites")
        .delete()
        .eq("profile_id", profile.id)
        .eq("game_id", game.id);
    }
  };
  

  return (
    <>
      <Navbar />
      <Section classes={"imgSection relative"}>
        <Swiper
          key={game.slugs}
          slidesPerView={1}
          spaceBetween={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Img src={game.background_image} alt="" key={game.id} />
          </SwiperSlide>
          <SwiperSlide>
            <Img src={game.background_image_additional} alt="" key={game.id} />
          </SwiperSlide>
        </Swiper>
      </Section>
      {/* FINE HERO */}

      <Section
        classes={
          "grid md:grid-cols-2 px-16 gap-14 md:absolute xl:top-[10%] lg:top-[14%] sm:top-[20%] "
        }
      >
        <Article classes={"hidden md:block"}>
          <Img src={game.background_image} classes={"rounded-xl"} />
        </Article>
        <Article classes={"backdrop-blur-lg bg-white/10 px-10 py-4 rounded-xl md:max-h-[400px] overflow-auto"}>
          <Title tag={"h3"} classes={"text-center text-3xl  mb-4"}>
            {game.name}
          </Title>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
            <Paragraph classes={"text-accent"}>
              Available for:{" "}
              {game.platforms.map((el) => {
                return (
                  <li className="font-bold text list-none" key={el.platform.id}>
                    {" "}
                    {el.platform.name}
                  </li>
                );
              })}
            </Paragraph>
            <Paragraph classes={"text-accent"}>
              Genres:{" "}
              {game.genres.map((el) => {
                return (
                  <li className="font-bold list-none" key={el.id}>
                    {" "}
                    {el.name}
                  </li>
                );
              })}
            </Paragraph>
            <Paragraph classes={"text-accent"}>
              Publishers:{" "}
              <div className="font-bold">
                {" "}
                {game.publishers.map((el) => el.name)}{" "}
              </div>{" "}
            </Paragraph>
            <Paragraph classes={"text-accent"}>
              Released: <div className="font-bold">{game.released}</div>
            </Paragraph>
            <Paragraph classes={"text-accent"}>
              Rating : <div className="font-bold">{game.rating} / 5</div>
            </Paragraph>
            <Paragraph classes={"text-accent"}>
              Ratings Count :{" "}
              <div className="font-bold">{game.ratings_count}</div>
            </Paragraph>
            {profile && (
              <div
                className="lg:tooltip w-25"
                data-tip={
                  favorite ? "Remove to my Wishlist" : "Add to my Wishlist"
                }
              >
                <Button
                  classes={"text-white border-none bg-accent"}
                  click={handleFavorite}
                >
                  {favorite ? <FaHeart /> : <FaRegHeart />}
                </Button>
              </div>
            )}
          </div>
        </Article>
      </Section>
      {/* CARDS END */}
      <Section
        classes={"md:px-24 px-10 md:mb-28 md:mt-72 lg:mt-56 2xl:mt-92 my-28"}
      >
        <Article classes={"mt-30"}>
          <Title tag={"h1"} classes={"text-3xl mb-8 text-accent"}>
            {" "}
            About
          </Title>
          <Paragraph classes={""}>{game.description_raw}</Paragraph>
          <Paragraph classes={"mt-5"}>
            tags:{" "}
            <span className="px-3">
              {game.tags
                ? game.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="badge badge-accent badge-outline px-3 mx-1 my-1"
                    >
                      {tag.name}
                    </div>
                  ))
                : " "}
            </span>
          </Paragraph>
        </Article>
      </Section>
      <Section classes={"md:px-24 px-10 my-28"}>
        <Article classes={"mt-30"}>
          <Title tag={"h1"} classes={"text-3xl mb-8 text-accent"}>
            {" "}
            Screenshots
          </Title>
        </Article>
        <Article classes={"grid md:grid-cols-2 gap-8"}>
          <div className="grid grid-cols-1 col-span-2 gap-4">
            {loadingScreen ? (
              <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm">
                <div className="loading loading-bars  bg-accent lg:w-24 w-14"></div>
              </div>
            ) : (
              screenshots &&
              screenshots.results.map((el, i) => {
                if (i == 5) {
                  return <Img key={el.id} src={el.image} />;
                }
              })
            )}
          </div>
          <div className="grid grid-cols-1">
            {loadingScreen ? (
              <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm">
                <div className="loading loading-bars  bg-accent lg:w-24 w-14"></div>
              </div>
            ) : (
              screenshots && <Img src={screenshots.results[0].image} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {loadingScreen ? (
              <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm">
                <div className="loading loading-bars  bg-accent lg:w-24 w-14"></div>
              </div>
            ) : (
              screenshots &&
              screenshots.results.map((el, i) => {
                if (i > 0 && i < 5) {
                  return <Img key={el.id} src={el.image} />;
                }
              })
            )}
          </div>
        </Article>
      </Section>
      {/* ABOUT END */}
      <Section classes={"md:px-24 px-10 my-28"}>
        <Article classes={"mt-30"}>
          <Title tag={"h1"} classes={"text-3xl mb-8 text-accent"}>
            {" "}
            DLC
          </Title>
        </Article>
        <Article classes={"grid md:grid-cols-3 gap-8"}>
          {loadingDLC ? (
            <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm">
              <div className="loading loading-bars  bg-accent lg:w-24 w-14"></div>
            </div>
          ) : (
            dlc &&
            dlc.results.map((DLC) => {
              return (
                <Card key={DLC.id}>
                  <figure>
                    <Card.Img src={DLC.background_image} classes={"CardDLC"} />
                  </figure>
                  <div className="flex justify-center mt-3">
                    <Card.Title tag={"h3"}> {DLC.name}</Card.Title>
                  </div>
                </Card>
              );
            })
          )}
        </Article>
      </Section>
      {/* END DLC */}
      <Section classes={"md:px-24 px-10 my-28"}>
        <Article classes={"mt-30"}>
          <Title tag={"h1"} classes={"text-3xl mb-8 text-accent"}>
            {" "}
            Stores
          </Title>
        </Article>
        <Article classes={"flex w-full flex-col lg:flex-row "}>
          {loadingStores ? (
            <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm">
              <div className="loading loading-bars  bg-accent lg:w-24 w-14"></div>
            </div>
          ) : (
            game &&
            game.stores.map((store, i) => {
              let url =
                stores && stores.results.map((storeURL) => storeURL.url);

              return (
                <div
                  className="card bg-base-300 rounded-none grid h-20 flex-grow place-items-center"
                  key={store.id}
                >
                  <a target="_blank" href={url[i]}>
                    {store.store.name}
                  </a>
                </div>
              );
            })
          )}
        </Article>
      </Section>
      {/* END STORES */}
    { profile &&
      ( <Section classes={"md:px-24 px-10 my-28"}>
          <Article classes={"mt-30"}>
            <Title tag={"h1"} classes={"text-3xl mb-8 text-accent"}>
              {" "}
              Reviews
            </Title>
          </Article>
          {/* REVIEW SECTION */}
          <ReviewsSection game={game} profile={profile} /> 

       </Section>
      )
    }
      {/* END REVIEWS */}
      <Footer />
    </>
  );
};

export default DetailView;

export async function detailLoader({ params }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const promise = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${API_KEY}`
  );
  const json = promise.json();
  return json;
}
