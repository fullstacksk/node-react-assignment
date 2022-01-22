import * as React from 'react';
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
import validateCreateUser from '../validation/validateCreateUser';
import SnackbarAlert from './SnackbarAlert';
;





function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Register = () => {
        const [errors, setErrors] = React.useState({});
        const [error, setError] = React.useState();
        const [success, setSuccess] = React.useState();
  const handleSubmit = async (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const newUser = {
            name: data.get('name'),
            email:data.get('email'),
            age: data.get('age'),
            mobile: data.get('mobile'),
            password:data.get('password'),
            confirmPassword:data.get('confirmPassword'),
            role:"USER"
          };
          const { isError, errors } = validateCreateUser(newUser);
          
            setErrors(errors);
            console.log("isError : ",isError);
          try {
            setError();
            setSuccess();
            if (isError){
              setError("Invaild Form")
              return;
            }
                const res = await axios.post(`http://localhost:3001/api/user/register`,newUser);
                event.target.reset();
                setSuccess("User registered successfully");
            } catch (err) {
              if(err.message.includes("400")){
                setError("User already registered ");
              setErrors(prevState => ({...prevState, email: "Email already registered"}));
              }
              else
                setError(err.message);
              console.log(err);
            }
            console.log("newUser :",newUser);
        };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      {success && <SnackbarAlert type="success" message={success} />}
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              error={errors.name}
              helperText={errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email}
              helperText={errors.email}
            />
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        
                        <TextField
                            margin="normal"
                            required
                            name="age"
                            label="Age"
                            type="number"
                            fullWidth
                            error={errors.age}
                            helperText={errors.age}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            required
                            name="mobile"
                            label="Mobile"
                            type="text"
                            fullWidth
                            error={errors.mobile}
                            helperText={errors.mobile}
                        />
                    </Grid>
                </Grid> 
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            autoComplete="current-password"
                            error={errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            required
                            autoComplete="current-password"
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                    </Grid>
                </Grid> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
            <Grid container >
                <Grid item xs={6}>
                    {" "}
                </Grid>
                <Grid item xs={6}>
                    <Link href="/login" variant="body2">
                    {"Are you an admin ? login here"}
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


export default Register;