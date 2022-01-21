import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
export const history = createBrowserHistory({forceRefresh: true});


const AppRouter = () => (
    <Router history={history}>
        <Fragment>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Fragment>
    </Router>
)
export default AppRouter;
