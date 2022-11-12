import { AppStore } from '../types';

export const getSignUpLoading = (state: AppStore): boolean =>
  state.signUp.isLoading || false;

export const getUserSignedUp = (state: AppStore): boolean =>
  state.signUp.isUserSignedUp || false;

export const getSignUpErrors = (state: AppStore): string[] =>
  state.signUp.errors || [];
