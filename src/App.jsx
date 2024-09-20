import router from './router/router'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import ChangePageProvider from './context/ChangePage'
import UserContextProvider from './context/UserContext'


function App() {


  return (
    <> 
    <UserContextProvider>
      <ChangePageProvider>
      
        <RouterProvider router={router} /> 
      
      </ChangePageProvider> 
    </UserContextProvider>
    </>
  )
}

export default App
