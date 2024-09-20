import { useEffect, useRef, useState } from "react";


const useScroll = () => {

    const [scrollY, setScrollY] = useState(0);
    const ref = useRef();

    const handleScroll = () => setScrollY(window.scrollY);

    useEffect(() =>{

        window.addEventListener("scroll", handleScroll);
    }),[];


    return [ref, scrollY]
}

export default useScroll