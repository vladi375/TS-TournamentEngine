import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import signUpReducer from './SignUp/signUpReducer';
import userReducer from './userSlice'

const createStore = (preloadedState: RootState) =>
    configureStore({
    reducer: {
      user: userReducer,
      signUp: signUpReducer
    },
    preloadedState
  });

export const LoadCurrentUser = () => {
    return axios
      .get("/account/user", {
        baseURL: process.env.REACT_APP_SERVER_URL,
        withCredentials: true,
      })
      .then((response) => {
        return createStore({ user: { ...response.data } });
      });
  };
  
