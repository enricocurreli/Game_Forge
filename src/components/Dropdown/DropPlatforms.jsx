import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ChangePage } from "../../context/ChangePage";

const DropPlatforms = ({ index, textDecoration, title, text }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const platforms = useFetch(
    ` https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
  );
  
  const {setPage} = useContext(ChangePage)

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  
  let i = index;
  const handleClick = ()=>{

    setIsOpen(false);
    setPage(1);
  }

  return (
    <div className="dropdown  dropdown-bottom hover:shadow-none hover:bg-transparent hover:border-none btnDropNav">
      <div
        tabIndex={0}
        role="button"
        className="bg-transparent border-none shadow-none text-white font-[Electrolize] flex gap-2 "
        onClick={toggleDropdown}
      >
        {title} {text}
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow lg:mt-4"
        >
          {platforms.data &&
            platforms.data.results[i].platforms.map((platform) => {
              return (
              
                  <li key={platform.id}>
                    <Link
                      to={`/platforms/${platform.id}/${platform.slug}`}
                      className={"py-1 text-center hover:" + textDecoration}
                      onClick={handleClick} 
                    >
                      {" "}
                      {platform.name}
                    </Link>
                  </li>
              
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default DropPlatforms;
