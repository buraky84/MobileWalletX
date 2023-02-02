import {WALLET_ACTIONS} from '../../actionTypes';

const baseApiUrl = 'https://coinabi.com:9999';

const headers = {
  Headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json',
  },
};

export const login = ({email, password}) => {
  return (dispatch: (arg0: {type: string}) => void, getState: () => any) => {
    dispatch(addTodoStarted());

    const response = fetch(baseApiUrl + '/login', {
      headers,
      method: 'POST',
      body: {
        email,
        password,
      },
      Cache: 'default',
    });

    if (response) {
    }
    console.log('current state:', getState());

    // ...
  };
};

const addTodoFailure = error => ({
  type: WALLET_ACTIONS.LOGIN_FAILED,
  payload: {
    error,
  },
});
