import React , {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUsers} from '../redux/user/action';
;




function createData(name, email, mobile, age, role) {
  return { name, email, mobile, age, role };
}

const rows = [
  createData('Shailendra Kumar', 'fullstacksk@gmail.ccom', '7845985645','23' ,"USER"),
];

const Dashboard = () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU5YWY5NDZiMTE3ZDY4MGU2YWVlMWIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0MjcwNTkxNX0.e4mpUCUdqo9wclGWBiETUaD5Bnaa_bUVM-VzgT8KfJk";
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users);
    console.log("users data in dashboard page: ",users)
    const getUsers = async (accessToken) =>{
            const config = {
                headers: {
                    "auth-token": accessToken
                }
            }
        try {
            const res = await axios.get("http://localhost:3001/api/user",config);
            console.log("fetch user res: ",res.data)
            dispatch(fetchUsers(res.data));
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getUsers(accessToken);
    },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Mobile</TableCell>
            <TableCell >age</TableCell>
            <TableCell >Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell >{user.email}</TableCell>
              <TableCell >{user.mobile}</TableCell>
              <TableCell >{user.age}</TableCell>
              <TableCell >{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
