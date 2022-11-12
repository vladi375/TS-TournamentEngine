import { AppStore } from '../types';

export const getLogInLoading = (state: AppStore): boolean =>
  state.logIn.isLoading || false;

export const getUserLoggedIn = (state: AppStore): boolean =>
  state.logIn.isUserLoggedIn || false;

export const getLogInErrors = (state: AppStore): string[] =>
  state.logIn.errors || [];

export const getLoggedInUserEmail = (state: AppStore): string =>
  state.logIn.email;
