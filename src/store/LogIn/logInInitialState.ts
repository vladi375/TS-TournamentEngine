import { logInState } from './logInState';

export const logInInitialState: logInState = {
  email: '',
  isUserLoggedIn: false,
  isLoading: false,
  errors: [],
  authToken: '',
};
