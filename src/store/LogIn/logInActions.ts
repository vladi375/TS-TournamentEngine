import { logInFormValues } from '../../views/LogInView';
import { AppDispatch } from './../../App';
import axios from 'axios';

export const LOG_IN_USER_FETCH_REQUEST = '/log-in/FETCH-REQUEST';
export const LOG_IN_USER_FETCH_SUCCESS = '/log-in/FETCH-SUCCESS';
export const LOG_IN_USER_FETCH_ERROR = '/log-in/FETCH-ERROR';

export const onLogInActionCreator = (values: logInFormValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: LOG_IN_USER_FETCH_REQUEST,
    });

    try {
      const response = await axios.post(
        'https://ts-tournament-engine.herokuapp.com/api/auth/login',
        {
          email: values.email,
          password: values.password,
          rememberMe: true,
        }
      );
      console.log('response', response);

      dispatch({
        type: LOG_IN_USER_FETCH_SUCCESS,
        payload: {
          email: values.email,
          authToken: response?.data?.token,
        },
      });
    } catch (error: any) {
      dispatch({
        type: LOG_IN_USER_FETCH_ERROR,
        payload: error.response,
      });
    }
  };
};
