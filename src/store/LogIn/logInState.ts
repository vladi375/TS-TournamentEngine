export interface logInState {
  email: '';
  isUserLoggedIn: boolean;
  isLoading: boolean;
  errors: string[];
  authToken: string;
}
