import { signUpInitialState } from './signUpInitialState';
import { SignUpState } from './signUpState';
import { AppAction } from '../types';

import {
  SIGN_UP_USER_FETCH_REQUEST,
  SIGN_UP_USER_FETCH_SUCCESS,
  SIGN_UP_USER_FETCH_ERROR,
} from './signUpActions';

const signUpReducer = (
  state = signUpInitialState,
  action: AppAction
): SignUpState => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_USER_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case SIGN_UP_USER_FETCH_SUCCESS: {
      return {
        isUserSignedUp: true,
        isLoading: false,
        errors: [],
      };
    }
    case SIGN_UP_USER_FETCH_ERROR:
      return {
        ...state,
        errors: payload.data.errors,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default signUpReducer;
