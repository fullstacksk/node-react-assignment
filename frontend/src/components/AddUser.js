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
import {createUser} from '../redux/user/action';



 const AddUser = () => {
        const dispatch = useDispatch();
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
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
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const newUser = {
            name: data.get('name'),
            email:data.get('email'),
            age: data.get('age'),
            mobile: data.get('mobile'),
            password:data.get('password'),
            role:"USER"
            };
            try {
                const res = await axios.post(`http://localhost:3001/api/user`,newUser,config);
                dispatch(createUser(res.data));
            } catch (err) {
                console.log(err);
            }
            console.log("newUser :",newUser);
        };

        

        return (
            <div>
                <Button variant="contained" color="primary" startIcon={<UserIcon />} onClick={handleClickOpen}>
                    Add New User
                </Button>
            <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit} >
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
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        
                        <TextField
                            autoFocus
                            margin="dense"
                            name="age"
                            label="Age"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="mobile"
                            label="Mobile"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                </Grid> 
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                </Grid> 
                </DialogContent>
                <DialogActions>
                <Button type="button" onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
            </div>
        );
}

export default AddUser;