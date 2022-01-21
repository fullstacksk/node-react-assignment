
import {FETCH_USERS,ADD_USER, SELECTED_USER, UPDATE_USER, DELETE_USER,LOGIN_USER,LOGOUT_USER} from './types';

export const fetchUsers = (users)=>{
    return {
        type:FETCH_USERS,
        payload:users
    }
}
export const createUser = (user)=>{
    return {
        type:ADD_USER,
        payload:user
    }
}
export const setSelectedUser = (user)=>{
    return {
        type:SELECTED_USER,
        payload:user
    }
}
export const loginUser = (user)=>{
    return {
        type:LOGIN_USER,
        payload:user
    }
}
export const logoutUser = ()=>{
    return {
        type:LOGOUT_USER,
        payload:null
    }
}
export const updateUser = (user)=>{
    console.log("UPDATE_USER : ",user);
    return {
        type:UPDATE_USER,
        payload:user
    }
}
export const deleteUser = (id)=>{
    console.log("DELETE_USER : ",id);
    return {
        type:DELETE_USER,
        payload:id
    }
}
