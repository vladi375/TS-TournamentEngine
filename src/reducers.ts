import { combineReducers } from 'redux';

import singUpReducer from './store/SignUp/signUpReducer';
import logInReducer from './store/LogIn/logInReducer';

export default combineReducers({
  signUp: singUpReducer,
  logIn: logInReducer,
});
