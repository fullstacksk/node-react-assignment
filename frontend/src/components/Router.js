import React, { useState } from 'react';
import { BrowserRouter , Route, Routes, Redirect , Navigate} from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import {useSelector} from 'react-redux';




const AppRouter = () => {
    const accessToken = localStorage.getItem('accessToken');
    const authUser = useSelector((store) => store.authUser);
    const authenticated = accessToken && authUser.accessToken;
    // console.log("authUser : ", authUser);
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={authenticated ?<Navigate to="/dashboard" /> : <Login /> } >
                    
                </Route>
                <Route exact path="/register" element={authenticated ? <Navigate to="/dashboard" /> : <Register />} />
                <Route exact path="/dashboard" element={authenticated ? <Dashboard />: <Navigate to="/login" />} />
            </Routes>)
}
export default AppRouter;
