import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { setSelectedUser, updateUser } from '../redux/user/action';
import SnackbarAlert from './SnackbarAlert';
import validateEditUser from '../validation/validateEditUser';

 const EditUser = ({user}) => {
        const [errors, setErrors] = React.useState({});
        const [error, setError] = React.useState();
        const [success, setSuccess] = React.useState();
        const dispatch = useDispatch();
        const selectedUser = useSelector(state=>state.selectedUser)
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                "auth-token": accessToken
            }
        }
        
        // console.log("selectedUser : ",selectedUser)

        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            dispatch(setSelectedUser(user));
            setOpen(true);
        };

        const handleClose = () => {
            dispatch(setSelectedUser({}));
            setOpen(false);
        };

     const handleSubmit = async (event) => {
            setSuccess();
            setError();
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const updatedUserData = {
            name: data.get('name'),
            age: data.get('age'),
            mobile: data.get('mobile'),
         };
         const { isError, errors } = validateEditUser(updatedUserData);
         setErrors(errors);
         if (isError) {
             setError("Invalid form");
             return;
         }
            try {
                const newUser = await axios.put(`http://localhost:3001/api/user/${user._id}`,updatedUserData,config);
                dispatch(updateUser(newUser.data));
                setSuccess("User updated successfully");
                handleClose();
            } catch (err) {
                setError(err.message);
                console.log(err);
            }
            // console.log("updatedUserData :",updatedUserData);
        };

        

        return (
            <div>
                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleClickOpen}>
                    Edit
                </Button>
                {success && <SnackbarAlert type="success" message={success} />}
                {error && <SnackbarAlert type="error" message={error} />}
            <Dialog open={open} component="form" onSubmit={handleSubmit} >
                <DialogTitle>Edit User</DialogTitle>
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
                    defaultValue={selectedUser.name}
                    error={errors.name}
                    helperText={errors.name}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    disabled
                    variant="standard"
                    defaultValue={selectedUser.email}
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
                            defaultValue={selectedUser.age}
                            error={errors.age}
                            helperText={errors.age}
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
                            defaultValue={selectedUser.mobile}
                            error={errors.mobile}
                            helperText={errors.mobile}
                        />
                    </Grid>
                </Grid> 
                </DialogContent>
                <DialogActions>
                <Button type="button" onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
            </div>
        );
}

export default EditUser;