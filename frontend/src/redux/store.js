import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import userReducer from './user/reducer';

const persistConfig = {
    key: "root",
    storage
}
const persistedReducer = persistReducer(persistConfig, userReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk,logger));

const persistor = persistStore(store)

export { persistor,store }