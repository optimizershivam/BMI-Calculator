import React, { Component } from 'react'
import { Route, Routes } from 'react-router'
import Home from './home/Home'
import SignUp from './signup/SignUp'
import Login from './Login/Login'
import BmiCalculator from "./bmiCalculator/BmiCalculator"
import ProtectedRoutes from './ProtectedRoutes'
import Profile from './profile/Profile'

const MainRoutes = () => {
  return (
    <>
       <Routes>
      <Route path='/' />
      <Route path = "/signup" element = {<SignUp/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/bmiCalculator" element = {<ProtectedRoutes Component={BmiCalculator} />}/>
      <Route path = "/profile" element = {<ProtectedRoutes Component={Profile} />}/>
    </Routes>
    </>
  )
}

export default MainRoutes