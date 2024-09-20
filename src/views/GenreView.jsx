import { Link } from 'react-router-dom';
import Section from '../components/Section/Section';
import Title from '../components/Title/Title';
import Article from '../components/Section/Article';
import Card from '../components/Card/Card';
import { useParams } from "react-router-dom";
import Button from '../components/Button/Button';
import Paragraph from '../components/Paragraph/Paragraph';
import { useContext} from "react";
import { ChangePage } from "../context/ChangePage";
import useFetch from "../hooks/useFetch";




const GenreView = () => {

  

    const {slug, name} = useParams();
  
    const API_KEY = import.meta.env.VITE_API_KEY;
  
    const {page, scrolled, scrollY, prevPage, nextPage, startPage } = useContext(ChangePage)
  
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&genres=${slug}&page_size=15&page=${page}&released`;
    
    const { data: games, loading: loading } = useFetch(url);
  
    

    return (
        <>
        
        <Section classes={"my-16 px-16"}>
        <Article
            classes={"text-3xl flex flex-wrap justify-center lg:justify-start"}
        >

          <Title tag={"h2"} classes={"lg:ps-10"}>
          Genres: {name}
          </Title>
        </Article>

        </Section>

        <Section classes={"my-10 px-16"}>

          <Article classes={"my-16 lg:px-10 grid lg:grid-cols-3 lg:gap-8 md:grid-cols-2 md:gap-5"}>
            

          {
          loading ? <div className="h-screen w-[100%] flex justify-center absolute  left-0 top-0 loaderCstm"><div className="loading loading-bars  bg-accent lg:w-24 w-14"></div></div>
          
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
        <Button classes={"join-item btn"} click={prevPage}>«</Button>
        <Paragraph classes={"join-item text-sm mt-4 px-5"}>Page {page}</Paragraph>
        <Button classes={"join-item btn"} click={nextPage}>»</Button>
      </div>
      </Section>
        
        </>
  );
}


export default GenreView
