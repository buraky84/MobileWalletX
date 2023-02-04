import {WALLET_ACTIONS} from '../../actionTypes';

const initialState = {
  walletSeed: '',
  address: '',
  keystore: {},
  balance: 0,
  lastTransactions: [
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.1,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.2,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.3,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.4,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.5,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.6,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.7,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.8,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 0.9,
    },
    {
      from: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      to: '0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55',
      amount: 1.0,
    },
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
