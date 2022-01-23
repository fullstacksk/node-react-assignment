import  React , {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import SnackbarAlert from './SnackbarAlert';
import validateLoginUser from '../validation/validateLoginUser';
// import validateToken from '../validation/validateToken';
import { useDispatch } from 'react-redux';
import {loginUser, fetchUsers} from '../redux/user/action';








function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Node Raect Demo App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = React.useState({});
    const [error, setError] = useState();
    const getUsers = async (accessToken) =>{
        try {
            const res = await axios.get("http://localhost:3001/api/user",{
        headers: {
            "auth-token": accessToken
        }
    });
            dispatch(fetchUsers(res.data));
        } catch (err) {
            console.log(err);
        }
    }
    const handleLogin = async (data) => {
        setError();
        const { errors, isError } = validateLoginUser(data);
        setErrors(errors);
        try {
            if(isError){
              setError("Invalid form");
              return;
            }
            const res = await axios.post("http://localhost:3001/api/user/login",data);
            localStorage.setItem('accessToken',res.data.accessToken);
            dispatch(loginUser(res.data));
            getUsers(res.data.accessToken);
            // console.log("data : ",res.data);
            
        } catch (err) {
          setError(err?.response?.data?.error || "Something went wrong");
      }
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    // console.log("loginData :",loginData);
    
    handleLogin(loginData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      {error && <SnackbarAlert type="error" message={error} />}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            
            <Grid container >
                <Grid item xs={6}>
                    {" "}
                </Grid>
                <Grid item xs={6}>
                    <Link href="/register" variant="body2">
                    {"Aren't you registered? Register"}
                    </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


export default Login;