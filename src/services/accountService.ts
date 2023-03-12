import Login from '../models/login';
import SetPassword from '../models/setPasssord';
import ResetPassword from '../models/resetPassword';
import httpClient from './httpClient';

export async function resetPassword(model: ResetPassword) {
  const url = '/account/password/reset';

  await httpClient.post(url, model);
}

export async function setPassword(model: SetPassword) {
  const url = '/account/password/set';

  await httpClient.post(url, model);
}

export async function getLoggedUser() {
  const url = '/account';

  const response = await httpClient.get(url);

  return response.data;
}

export async function login(model: Login) {
  const url = '/account/login';

  const response = await httpClient.post(url, model);

  return response.data;
}

export async function logout() {
  const url = '/account/logout';

  await httpClient.post(url, {});
}
