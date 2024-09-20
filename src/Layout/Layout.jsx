import { Outlet, useLoaderData } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
import Banner from '../components/Banner/Banner'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Layout = () => {

    const games = useLoaderData();
   
    const {user} = useContext(UserContext)
    

    return (
        <>
            <Navbar />
            <Hero games={games} />
            <Outlet />
            {
              !user &&(

                <Banner />
              )

            }
            <Footer />
        
        </>
      )
}
  
  export default Layout

  export async function LayoutLoader(){

    const API_KEY = import.meta.env.VITE_API_KEY;
    const promise =  await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&platform=187,186&dates=2020-01-01,2024-08-31&page_size=40`);
    const json = await promise.json();
    return json;
  }