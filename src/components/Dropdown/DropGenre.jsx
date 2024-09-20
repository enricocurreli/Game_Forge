import React, { useState, useContext } from "react";
import { FaListUl } from "react-icons/fa6";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { ChangePage } from "../../context/ChangePage";


const DropGenre = () => {


  const API_KEY = import.meta.env.VITE_API_KEY;
  const genres = useFetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const {setPage} = useContext(ChangePage)
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleClick = ()=>{

    setIsOpen(false);
    setPage(1);
  }
  return (
    
    <div className="dropdown dropdown-bottom hover:shadow-none hover:bg-transparent hover:border-none btnDropNav">
      <div tabIndex={0} role="button" className="bg-transparent border-none shadow-none text-white font-[Electrolize] flex gap-2" onClick={toggleDropdown}>
      <FaListUl className="mt-[2px]" /> Genres
      </div>
      {isOpen && (<ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow lg:mt-4"
      >
        {
        genres.data && genres.data.results.map((genre)=> {

          return(

          
            <li key={genre.id}>
              <Link to={`/genre/${genre.slug}/${genre.name}`}   className={"py-1 text-center hover:text-orange-600"} role="button" onClick={handleClick}> {genre.name} </Link>
            </li>
            
          )
        })}
        
      </ul>)}
    </div>
  );
};

export default DropGenre;
