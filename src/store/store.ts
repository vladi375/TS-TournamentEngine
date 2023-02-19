import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import signUpReducer from './SignUp/signUpReducer';
import userReducer from './userSlice';

const createStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      user: userReducer,
      signUp: signUpReducer,
    },
    preloadedState,
  });

export const defaultStore = createStore();

export const preloadStore = () => {
  return axios
    .get('/account/user', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      withCredentials: true,
    })
    .then(response => {
      return createStore({ user: { ...response.data } });
    });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof defaultStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof defaultStore.dispatch;
