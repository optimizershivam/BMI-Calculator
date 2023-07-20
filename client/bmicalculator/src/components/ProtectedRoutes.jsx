import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoutes = (props) => {
    const { Component } =  props
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    },)
    
  return (
    <>
    <Component/>
    </>
  )
}

export default ProtectedRoutes