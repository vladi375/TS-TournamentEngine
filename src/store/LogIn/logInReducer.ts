import { logInInitialState } from './logInInitialState';
import { logInState } from './logInState';
import { AppAction } from '../types';

import {
  LOG_IN_USER_FETCH_REQUEST,
  LOG_IN_USER_FETCH_SUCCESS,
  LOG_IN_USER_FETCH_ERROR,
} from './logInActions';

const logInReducer = (
  state = logInInitialState,
  action: AppAction
): logInState => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN_USER_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case LOG_IN_USER_FETCH_SUCCESS: {
      return {
        email: payload.email,
        isUserLoggedIn: true,
        isLoading: false,
        errors: [],
        authToken: payload.authToken,
      };
    }
    case LOG_IN_USER_FETCH_ERROR:
      return {
        ...state,
        errors: payload.data.errors,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default logInReducer;
