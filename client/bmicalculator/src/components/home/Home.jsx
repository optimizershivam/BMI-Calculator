import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../../utils/utils'

const Home = () => {
    const navigate = useNavigate
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate('/login');
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', height: "50px", border: "1px solid red", alignItems: "center" }}>

            <Link to="/login">Login </Link>


            <Link to="/signup">SignUp </Link>


            <Link to="/bmiCalculator">BMI Calculator</Link>

            <Link to="/profile">Profile</Link>

           {isLoggedIn() ? (<Button variant="outline"
                onClick={handleLogout}>
                Logout
            </Button>): <></>} 



        </div>
    )
}

export default Home