import React from 'react'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <Outlet/>
    </>
  )
}

export default AuthLayout