import { createContext, useState } from "react";
import useScroll from "../hooks/useScroll";

export const ChangePage = createContext();

const ChangePageProvider = ({ children }) => {
  
    const [page, setPage] = useState(1);
    const [scrolled, scrollY] = useScroll(0);


  const nextPage = () => {
    if (page <= 511) {
      setPage((prev) => prev + 1);
    }

    if (scrollY >= 1000) {
      window.scrollTo({ top: 0});
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }

    if (scrollY >= 1000) {
      window.scrollTo({ top: 0});
    }
  };

  const startPage = () =>{
    if (scrollY > 0) {
      window.scrollTo({ top: 0});
    }

  }



  let obj = {page, scrolled, scrollY, prevPage, nextPage, startPage}

  return(

    <ChangePage.Provider value={obj}>
        {children}
    </ChangePage.Provider>    
  )
};

export default ChangePageProvider;