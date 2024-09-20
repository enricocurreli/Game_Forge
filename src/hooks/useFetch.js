import { useEffect, useState } from "react";


const useFetch = (url) => {
  
    // const [data, setData] = useState();
   
    // const getData = async ()=>{
    //     const promise = await fetch(url);
    //     const json = await promise.json();
    //     setData(json);
    // }

    // useEffect(
    //     ()=>{
    //         getData();
    //     }, []
    // )

  
  
  
    // return data;


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Errore nella fetch');
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]); // L'uso dell'URL come dipendenza assicura che la fetch si riesegua quando l'URL cambia
  
    return { data, loading, error };
  }


export default useFetch;


   