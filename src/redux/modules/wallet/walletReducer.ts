import {WALLET_ACTIONS} from '../../actionTypes';

const initialState = {
  walletSeed: '',
  address: '',
  keystore: {},
  balance: 0,
  lastTransactions: [
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
    {from: 'vcxvcxvxc', to: 'dadarewrwsd', amount: 1.1},
  ],
};

//************************ REDUCER ************************************

export const walletReducer = (state = initialState, action: any) => {
  let newState = state;

  switch (action.type) {
    case WALLET_ACTIONS.RESET_WALLET_INFO:
      newState = {
        ...initialState,
      };
      console.log('newState => ', newState);
      return newState;
    case WALLET_ACTIONS.SET_WALLET_INFO:
      newState = {
        ...state,
        address: action.payload.address,
        walletSeed: action.payload.mnemonic,
        keystore: JSON.parse(action.payload.keystore),
      };
      return newState;
    case WALLET_ACTIONS.SET_BALANCE:
      newState = {
        ...state,
        balance: action.payload,
      };
      return newState;
    default:
      return state;
  }
};
