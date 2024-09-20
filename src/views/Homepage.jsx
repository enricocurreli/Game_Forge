import { Link, useLoaderData } from "react-router-dom";
import Section from "../components/Section/Section";
import Title from "../components/Title/Title";
import Article from "../components/Section/Article";
import Card from "../components/Card/Card";
import Paragraph from "../components/Paragraph/Paragraph";
import routes from "../router/routes";
import useFetch from "../hooks/useFetch";
import Img from "../components/Img/Img";
import { useContext } from "react";
import { ChangePage } from "../context/ChangePage";

const Homepage = () => {
  const games = useLoaderData();
  const API_KEY = import.meta.env.VITE_API_KEY;

  let url = `https://api.rawg.io/api/stores?key=${API_KEY}`;
  const { data: stores } = useFetch(url);

  const {setPage, startPage} = useContext(ChangePage)
  return (
    <>
      <Section classes={"my-16 px-16"}>
        <Article
          classes={"text-3xl flex flex-wrap justify-center lg:justify-start"}
        >
          <Link
            to={routes.thisYears}
            className={"lg:ps-10 hover:text-gray-400"}
            onClick={()=>setPage(1)}
          >
            This years <span className="font-extrabold">⟩</span>
          </Link>
        </Article>
        <Paragraph classes={" text-center mt-10 text-2xl"}>
        Discover the games of this year's
        </Paragraph>
        <Article
          classes={"my-16 lg:px-10 grid lg:grid-cols-3 lg:gap-8 md:grid-cols-2"}
        >
          {games &&
            games.results.map((game, index) => {
              if (index < 8) {
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
              }
            })}
        </Article>
      </Section>

      <Section classes={"my-16 px-16"}>
        <Article
          classes={"text-3xl flex flex-wrap justify-center lg:justify-start"}
        >
          <Title tag={"h2"} classes={"lg:ps-10"}>
            Stores
          </Title>
        </Article>
        <Article classes={"my-16 px-10"}>
          <div className="flex w-full flex-col lg:flex-row ">
            {stores &&
              stores.results.map((store) => {                
                return (
                  <div
                    className="card bg-base-300 rounded-none grid h-20 flex-grow place-items-center"
                    key={store.id}
                  >
                    <a className="hover:text-accent" key={store.id}>
                      {" "}
                      {store.name}
                    </a>
                  </div>
                );
              })}
          </div>
        </Article>
      </Section>
    </>
  );
};

export default Homepage;

export async function gamesLoader() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-08-30&platforms=4,187,18,1,186,7`
  );
  const json = await promise.json();
  return json;
}
