import axios from 'axios';
import SignUp from '../models/signUp';
import Login from '../models/login';
import SetPassword from '../models/setPasssord';
import ResetPassword from '../models/resetPassword';

export async function signUp(model: SignUp) {
  const url = '/account';

  await axios.post(url, model);
}

export async function resetPassword(model: ResetPassword) {
  const url = '/account/password/reset';

  await axios.post(url, model);
}

export async function setPassword(model: SetPassword) {
  const url = '/account/password/set';

  await axios.post(url, model);
}

export async function login(model: Login) {
  const url = '/account/login';

  const response = await axios.post(url, model);

  return response.data;
}

export async function logout() {
  const url = '/account/logout';

  await axios.post(url, {});
}
