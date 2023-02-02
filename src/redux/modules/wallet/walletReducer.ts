import {WALLET_ACTIONS} from '../../actionTypes';

const initialState = {
  walletSeed: [],
};

//************************ REDUCER ************************************

export const walletReducer = (state = initialState, action: any) => {
  let newState = state;

  switch (action.type) {
    case WALLET_ACTIONS.SET_WALLET_PHRASE:
      newState = {
        ...state,
        walletSeed: action.payload,
      };
      console.log('newState => ', newState);
      return newState;
    default:
      return state;
  }
};
