import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import errorReducer from './errorSlice'
import { loadCurrentUser } from '../services/accountService';

const createStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      user: userReducer,
      error: errorReducer
    },
    preloadedState,
  });

export const defaultStore = createStore();

export const preloadStore = async () => {
  const user = await loadCurrentUser();

  return createStore({ user: { ...user } })
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof defaultStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof defaultStore.dispatch;
