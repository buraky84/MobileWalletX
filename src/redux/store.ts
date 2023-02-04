import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {walletReducer} from './modules/wallet/walletReducer';

const reducers = combineReducers({
  wallet: walletReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [],
});

export default store;
