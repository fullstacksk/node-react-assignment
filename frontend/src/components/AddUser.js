import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserIcon from '@mui/icons-material/GroupAdd';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { createUser } from '../redux/user/action';
import validateCreateUser from '../validation/validateCreateUser';
import SnackbarAlert from './SnackbarAlert';
;





 const AddUser = () => {
        const [errors, setErrors] = React.useState({});
        const [error, setError] = React.useState();
        const [success, setSuccess] = React.useState();
        const [file, setFile] = React.useState();
        const handleFileChange = (e)=>{
          setFile(e.target.files[0])
        }
        const dispatch = useDispatch();
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "auth-token": accessToken
            }
        }
        

        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

     const handleSubmit = async (event) => {
            setError();
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            data.append('role',"USER")
            const newUser = {
            name: data.get('name'),
            email:data.get('email'),
            age: data.get('age'),
            mobile: data.get('mobile'),
            password:data.get('password'),
            confirmPassword:data.get('confirmPassword'),
            avatar:file,
            role:"USER"
            };
            const { isError, errors } = validateCreateUser(newUser);
            setErrors(errors);
            if (isError) {
                setError("Invalid form");
                return;
            }
            try {
                const res = await axios.post(`http://localhost:3001/api/user`,data,config);
                dispatch(createUser(res.data));
                handleClose();
                setSuccess("User created sussessfully");
            } catch (err) {
                setError(err?.response?.data?.error || "Something went wrong");
                if(err?.response?.data?.error?.includes('exists'))
                    setErrors(prevState => ({...prevState, email: "Email already registered"}));
              
            }
            // console.log("newUser :",newUser);
        };

        

        return (
            <div>
                <Button variant="contained" color="primary" startIcon={<UserIcon />} onClick={handleClickOpen}>
                    Add New User
                </Button>
                {success && <SnackbarAlert type="success" message={success} />}
                {error && <SnackbarAlert type="error" message={error} />}
            <Dialog open={open}  disableEscapeKeyDown disableBackdropClick  component="form" noValidate onSubmit={handleSubmit} >
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    error={errors.name}
                    helperText={errors.name}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    required
                    error={errors.email}
                    helperText={errors.email}
                />
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        
                        <TextField
                            margin="dense"
                            name="age"
                            label="Age"
                            type="number"
                            fullWidth
                            variant="standard"
                            required
                            error={errors.age}
                            helperText={errors.age}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            margin="dense"
                            name="mobile"
                            label="Mobile"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            error={errors.mobile}
                            helperText={errors.mobile}
                        />
                    </Grid>
                </Grid> 
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            required
                            error={errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            margin="dense"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            required
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                    </Grid>
                </Grid> 
                <TextField
                    margin="normal"
                    type="file"
                    fullWidth
                    id="avatar"
                    // label="Upload Image"
                    onChange={handleFileChange}
                    name="avatar"
                    error={errors.avatar}
                    helperText={errors.avatar}
                />
                </DialogContent>
                <DialogActions>
                <Button type="button" onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
            </div>
        );
}

export default AddUser;