import { RootState } from "../store";

export const getSignUpLoading = (state: RootState): boolean =>
  state.signUp.isLoading || false;

export const getUserSignedUp = (state: RootState): boolean =>
  state.signUp.isUserSignedUp || false;

export const getSignUpErrors = (state: RootState): string[] =>
  state.signUp.errors || [];
