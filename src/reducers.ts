import { combineReducers } from 'redux';

import singUpReducer from './store/SignUp/signUpReducer';

export default combineReducers({
  signUp: singUpReducer,
});
