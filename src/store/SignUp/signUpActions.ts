import { FormValues } from './../../views/SignUpView';
import { AppDispatch } from './../../App';
import axios from 'axios';

export const SIGN_UP_PLAYER_FETCH_REQUEST = 'sign-up/FETCH_REQUEST';
export const SIGN_UP_PLAYER_FETCH_SUCCESS = 'sign-up/FETCH_SUCCESS';
export const SIGN_UP_PLAYER_FETCH_ERROR = 'sign-up/FETCH_ERROR';

export const onSignUpActionCreator = (values: FormValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: SIGN_UP_PLAYER_FETCH_REQUEST,
    });

    try {
      const response = await axios.post(
        'https://ts-tournament-engine.herokuapp.com/api/user',
        values
      );
      dispatch({
        type: SIGN_UP_PLAYER_FETCH_SUCCESS,
        payload: response?.data,
      });
    } catch (error: any) {
      dispatch({
        type: SIGN_UP_PLAYER_FETCH_ERROR,
        payload: error.response?.data,
      });
    }
  };
};

// import { createAction } from 'redux-actions';

// import { API_URL } from '../../constants';

// export const SIGN_UP_PLAYER_FETCH_REQUEST = 'sign-up/FETCH_REQUEST';
// export const SIGN_UP_PLAYER_FETCH_SUCCESS = 'sign-up/FETCH_SUCCESS';
// export const SIGN_UP_PLAYER_FETCH_ERROR = 'sign-up/FETCH_ERROR';

// export const signUp = createAction(
//   SIGN_UP_PLAYER_FETCH_REQUEST,
//   (userData: Record<string, any>) => ({
//     url: API_URL.signUp(),
//     options: {
//       method: 'POST',
//       body: JSON.stringify(userData),
//     },
//   }),
//   (postSuccessCallback: () => void, postErrorCallback: () => void) => ({
//     postSuccessCallback,
//     postErrorCallback,
//   })
// );
