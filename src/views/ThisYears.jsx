import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import Section from "../components/Section/Section";
import Article from "../components/Section/Article";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import useFetch from "../hooks/useFetch";
import { useContext, useState} from "react";
import { ChangePage } from "../context/ChangePage";
import Paragraph from "../components/Paragraph/Paragraph";
import routes from "../router/routes";

const ThisYears = () => {


  const {page, scrolled, scrollY, prevPage, nextPage, startPage } = useContext(ChangePage)
  const API_KEY = import.meta.env.VITE_API_KEY;

  const genres = useFetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

  const [genre, setGenre] = useState("all");
  let url;

  if (genre == "all") {
    url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-08-30&page=${page}&page_size=15`;
  } else {
    url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-08-30&page=${page}&page_size=15&genres=${genre}`;
  }

  const { data: games, loading: loading } = useFetch(url);
  
  
  
  return (

    <>
    <Section classes={"my-10 px-16 "}>
     <Article classes={"text-3xl grid lg:grid-cols-3 grid-cols-2"}>
          <Title tag={"h2"} classes={"lg:ps-10 lg:col-span-1 col-span-2"}>
           All Games 2024
          </Title>
          <label htmlFor="selectGenre" className="lg:text-end lg:pe-5 text-base text-center content-center lg:mt-0 mt-10 ">Genres</label>
          <select
            className="select select-bordered w-full max-w-40 lg:mt-0 mt-10 focus:border-accent"
            onChange={(e) => setGenre(e.target.value)}
            id="selectGenre"
          >
            <option selected>all</option>
            {genres.data &&
              genres.data.results.map((genre) => {
                return <option key={genre.id}>{genre.slug}</option>;
              })}
          </select>
        </Article>


    </Section>  
    <Section classes={"my-10 px-16"}>
      <Article
        classes={"my-16 lg:px-10 grid lg:grid-cols-3 lg:gap-8 md:grid-cols-2 md:gap-5"}
      >
        {
          loading ? <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm"><span className="loading loading-bars  bg-accent lg:w-24 w-14"></span></div>
          
          :games &&
          games.results.map((game) => {
          
           return (
             <Link
              to={`/detail/${game.id}`}
              key={game.id}
              className={"my-5 hover:scale-110 transitionCard"}
              onClick={startPage}
             >
                <Card key={game.id}>
                      <figure>
                        <Card.Img
                          src={game.background_image}
                          classes={"imgCard hover:mb-5"}
                        />
                      </figure>
                      <div className="flex justify-center mt-3">
                        <Card.Title tag={"h3"}> {game.name}</Card.Title>
                      </div>
                    </Card>
             </Link>
           );
          })
        }
      </Article>

      <div className="join flex justify-center">
        <Button classes={"join-item btn"} click={prevPage}>
          «
        </Button>
        <Paragraph classes={"join-item text-sm mt-4 px-5"}>
          Page {page}
        </Paragraph>
        <Button classes={"join-item btn"} click={nextPage}>
          »
        </Button>
      </div>
    </Section>

    </>
  );
};


export default ThisYears;


