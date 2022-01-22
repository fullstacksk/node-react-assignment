import  React , {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import { history } from './Router';
import SnackbarAlert from './SnackbarAlert';
import validateLoginUser from '../validation/validateLoginUser';
;





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
    const [errors, setErrors] = React.useState({});
    const [error, setError] = useState();
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
            console.log("data : ",res.data);
            localStorage.setItem('accessToken',res.data.accessToken);
            history.push("/dashboard");
            
        } catch (err) {
              if(err.message.includes("400")){
                setError("Invalid email/password ");
              }
              else
                setError(err.message);
              console.log(err);
      }
    }
    // useEffect(()=>{
    // },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log("loginData :",loginData);
    
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