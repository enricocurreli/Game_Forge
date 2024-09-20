import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import Layout, {LayoutLoader} from "../Layout/Layout";
import Homepage, {gamesLoader} from "../views/Homepage";
import GenreView from "../views/GenreView";
import ThisYears from "../views/ThisYears";
import PlatformView from "../views/PlatformView";
import AuthLayout from "../Layout/AuthLayout";
import SignUpView from "../views/SignUpView";
import LoginView from "../views/LoginView";
import ProfileView from "../views/ProfileView";
import DetailView, { detailLoader } from "../views/DetailView";
import SearchView from "../views/SearchView"


const router = createBrowserRouter([
    
    {
        path:'/',
        element: <Layout />,
        loader: LayoutLoader ,
        children:[

            {
                path: routes.home, 
                element: <Homepage />, 
                loader: gamesLoader
            },
            {
                path: routes.thisYears, 
                element: <ThisYears />,
            },
            {
                path: routes.genre,
                element: <GenreView />,
            },

            {
                path: routes.platform, 
                element: <PlatformView />,
            },
            
            {
                path: routes.search, 
                element: <SearchView />,
            },
            

            
        ]
    },
    {
        path: routes.auth,
        element: <AuthLayout />,
        children:[
            {
                path: routes.signUp,
                element: <SignUpView/>
            },
            {
                path: routes.login,
                element: <LoginView/>
            },
            {
                path: routes.profile,
                element: <ProfileView/>
            }
        
        ]
    },
    {
        path:routes.detail,
        element: <DetailView />,
        loader: detailLoader
    } 



])


export default router;