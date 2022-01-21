import {FETCH_USERS,ADD_USER, SELECTED_USER, UPDATE_USER, DELETE_USER,LOGIN_USER,LOGOUT_USER} from './types';
;

const initialState={
    loading:false,
    users:[],
    selectedUser:{},
    authUser:{},
    error:""
}

export default (state=initialState, {type,payload}) =>{
    switch(type){
        case LOGIN_USER :
            return {
                ...state,
                authUser:{...payload}
            }
        case FETCH_USERS : 
            return {
                ...state,
                users:[...payload]
            }
        case ADD_USER :
            return {
                ...state,
                users:[payload,...state.users]
            }
        case SELECTED_USER :
            return {
                ...state,
                selectedUser:{...payload}
            }
        case UPDATE_USER :
            return {
                ...state,
                users:[...state.users.map(user => {
                    if(user._id === payload._id){
                        return {
                            ...user,
                            ...payload
                        };
                    }
                return user;
                })]
            }
        case DELETE_USER : 
            return {
                ...state,
                users:[...state.users.filter(user=> user._id !== payload)]
            }
        case LOGOUT_USER : 
            return initialState;
        default : 
            return state;
    }
}