import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/util';
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';




export default function Login() {
  let myRef = {}
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
     const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
        const res = await axios.post('https://user-edu-tech.onrender.com/user/login',formData);
        console.log(res);
        if (res.data.status === 'error') {
            toast.error(res.data.message, toastOptions);
        } else {
            localStorage.setItem('token', JSON.stringify(res.data.user.token))
            if (isLoggedIn()) {
                console.log("yes"); 
                const valid = myRef.current.reportValidity()
                if(valid) {
                  if( toast.success('Login Sucesss! You are redirecting to course page',toastOptions))
                  {
                      setTimeout(() => {
                       navigate("/courses")
                     }, 3000);
                  }
                }
               
            };
        }
      
    } catch (err) {
        console.log("error");
      }
  };

  return (
    <>
     <Back title='Login Now!' />
   
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/hand-drawn-realistic-back-school-wallpaper_23-2148583268.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                inputRef={myRef}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                inputRef={myRef}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {myRef.current.reportValidity()}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <ToastContainer/>
      </Grid>
      </>
  );
}