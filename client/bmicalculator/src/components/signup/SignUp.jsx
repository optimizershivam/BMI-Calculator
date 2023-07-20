import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useState} from "react"
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link } from "react-router-dom"



const SignUp = () => {



   const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme:"light",
  };
 

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = ({
      name:data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
    if(!formData.name)
    {
      toast.error("please enter name to signup")
      return
    }
    if(!formData.email)
    {
      toast.error("please enter email to signup")
      return
    }
    if(!formData.password)
    {
      toast.error("please enter password to signup")
      return
    }
    try {
      const res = await axios.post('http://localhost:8080/auth/signup',formData);
      console.log(res.data);
      if (res.data.status === 'error') {
        toast.error(res.data.message, toastOptions);
      
      } else {
     {toast.success('Signup Sucesss! Redirecting to Login Page',toastOptions)
        setTimeout(() => {
          navigate("/login")
        }, 3000);
      }
      }
    
  } catch (err) {
      console.log("error");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  required
                  name="name"
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                 />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
      </>
  );
}
export default SignUp