import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {walletReducer} from './modules/wallet/walletReducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  wallet: walletReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
});

export default store;
