import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//Reducer stuff
import userReducer from './user/reducer';

const store = createStore(userReducer,applyMiddleware(thunk));

export { store as default }