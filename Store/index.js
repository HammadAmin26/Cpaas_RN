import {  applyMiddleware } from 'redux';
import { createStore } from 'redux-dynamic-reducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {AsyncStorage} from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import StatesCombiner from './StatesCombiner';
const loggerMiddleware = createLogger();
const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  keyPrefix: '',
  timeout: 10000,
  whitelist :["user"]
  //blacklist: ['subscribers','active_channel','current_messages','current_chat','current_screen','friendList','channels']
}
 
const persistedReducer = persistReducer(persistConfig, StatesCombiner);

 const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);
let Persistor = persistStore(store);
export {store,Persistor} ;