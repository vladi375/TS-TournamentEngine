import axios from 'axios';
import LoginRequest from '../models/loginRequest';
import SetPasswordRequest from '../models/setPasssordRequest';
import ResetPasswordRequest from './../models/resetPasswordRequest';

export async function resetPassword(model: ResetPasswordRequest) {
  const url = '/account/password/reset';

  await axios.post(url, model);
}

export async function setPassword(model: SetPasswordRequest) {
  const url = '/account/password/set';

  await axios.post(url, model);
}

export async function login(model: LoginRequest) {
  const url = '/account/login';

  const response = await axios.post(url, model);

  return response.data;
}

export async function logout() {
  const url = '/account/logout';

  await axios.post(url, {});
}
