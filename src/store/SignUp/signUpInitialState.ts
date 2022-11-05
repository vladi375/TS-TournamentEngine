import { SignUpState } from './signUpState';

export const signUpInitialState: SignUpState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  nickname: '',
  country: '',
  isUserSignedUp: false,
  isLoading: false,
};
