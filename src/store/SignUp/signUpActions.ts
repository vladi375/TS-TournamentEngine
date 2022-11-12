import { signUpFormValues } from './../../views/SignUpView';
import { AppDispatch } from './../../App';
import axios from 'axios';

export const SIGN_UP_USER_FETCH_REQUEST = 'sign-up/FETCH_REQUEST';
export const SIGN_UP_USER_FETCH_SUCCESS = 'sign-up/FETCH_SUCCESS';
export const SIGN_UP_USER_FETCH_ERROR = 'sign-up/FETCH_ERROR';

export const onSignUpActionCreator = (values: signUpFormValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: SIGN_UP_USER_FETCH_REQUEST,
    });

    try {
      const response = await axios.post(
        'https://ts-tournament-engine.herokuapp.com/api/user',
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          nickname: values.nickname,
          country: values.country,
        }
      );
      console.log('response', response);

      dispatch({
        type: SIGN_UP_USER_FETCH_SUCCESS,
        payload: response?.data,
      });
    } catch (error: any) {
      dispatch({
        type: SIGN_UP_USER_FETCH_ERROR,
        payload: error.response,
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
