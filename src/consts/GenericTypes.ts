import store from '../redux/store';

export type React$Node = JSX.Element | null;
export type RootState = ReturnType<typeof store.getState>;
