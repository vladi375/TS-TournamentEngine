import { signUpInitialState } from './signUpInitialState';
import { SignUpState } from './signUpState';
import { AppAction } from '../types';

import {
  SIGN_UP_PLAYER_FETCH_REQUEST,
  SIGN_UP_PLAYER_FETCH_SUCCESS,
  SIGN_UP_PLAYER_FETCH_ERROR,
} from './signUpActions';

const signUpReducer = (
  state = signUpInitialState,
  action: AppAction
): SignUpState => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_PLAYER_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_UP_PLAYER_FETCH_SUCCESS: {
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        nickname: payload.nickname,
        country: payload.country,
        isUserSignedUp: true,
        isLoading: false,
      };
    }
    case SIGN_UP_PLAYER_FETCH_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default signUpReducer;
