export interface SignUpState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nickname: string;
  country: string;
  isUserSignedUp: boolean;
  isLoading: boolean;
  errors: string[];
}
