import React , {useEffect} from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import EditUser from './EditUser';
import AddUser from './AddUser';
import SnackbarAlert from './SnackbarAlert';


import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, logoutUser } from '../redux/user/action';

const Dashboard = () => {
    const [success, setSuccess] = React.useState();
    const [error, setError] = React.useState();
    const accessToken = localStorage.getItem('accessToken')
    const dispatch = useDispatch()
    
    const users = useSelector((state) => state.users);
    // console.log("users data in dashboard page: ",users)
    
    const config = {
        headers: {
            "auth-token": accessToken
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        dispatch(logoutUser());
    }
    const handleDeleteUser = async (id)=>{
        try {
            setSuccess();
            setError();
            await axios.delete(`http://localhost:3001/api/user/${id}`,config)
            dispatch(deleteUser(id))
            setSuccess("User deleted successfully");
        } catch (err) {
            setError(err?.response?.data?.error || "Something went wrong");
            console.log(err);
        }
    }
    
  return (
      <Container>
      {success && <SnackbarAlert type="success" message={success} />}
      {error && <SnackbarAlert type="error" message={error} />}
        <TableContainer component={Paper} style={{marginTop:"32px",marginBottom:"16px", background:'#E7EBF0' }} >
            <div style={{padding:"16px 16px",display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h3>Dashboard</h3> 
                <div style={{display:'flex'}}>
                      <AddUser />
                        <Button style={{marginLeft:'32px'}} variant="contained" color="error" startIcon={<LogoutIcon />} 
                        onClick={()=>handleLogout()} >
                            Log Out
                        </Button> 

                </div>
            </div>
        </TableContainer >
        {users.length ? <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow style={{background:'#E7EBF0'}}>
                <TableCell><b>Sl No</b></TableCell>
                <TableCell><b>Avatar</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell ><b>Email</b></TableCell>
                <TableCell ><b>Mobile</b></TableCell>
                <TableCell ><b>age</b></TableCell>
                <TableCell ><b>Role</b></TableCell>
                <TableCell align="center" ><b>Actions</b></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user, index) => (
                <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell ><strong>{index+1}</strong></TableCell>
                <TableCell >
                    <Avatar src={`http://localhost:3001/api/${user.avatar}`} variant="square" sx={{ width: 40, height: 40 }}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    {user.name}
                </TableCell>
                <TableCell >{user.email}</TableCell>
                <TableCell >{user.mobile}</TableCell>
                <TableCell >{user.age}</TableCell>
                <TableCell >{user.role}</TableCell>
                <TableCell align="center" >
                    <div style={{display:'flex',justifyContent:'space-around'}} >
                        <EditUser user ={user}/>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />} 
                        onClick={()=>handleDeleteUser(user._id)} >
                            Delete
                        </Button>
                    </div>
                </TableCell>
                </TableRow>
            ))}       
            </TableBody>
        </Table>
        </TableContainer>
        :<div style={{display:'flex',justifyContent:'center'}}>No Data Found</div>}  
    </Container>
  );
}

export default Dashboard;
