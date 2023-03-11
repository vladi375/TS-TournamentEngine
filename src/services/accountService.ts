import SignUp from '../models/signUp';
import Login from '../models/login';
import SetPassword from '../models/setPasssord';
import ResetPassword from '../models/resetPassword';
import httpClient from './httpClient';
import PlayerModel from '../models/player';

export async function signUp(model: SignUp) {
  const url = '/account';

  await httpClient.post(url, model);
}

export async function resetPassword(model: ResetPassword) {
  const url = '/account/password/reset';

  await httpClient.post(url, model);
}

export async function setPassword(model: SetPassword) {
  const url = '/account/password/set';

  await httpClient.post(url, model);
}

export async function loadCurrentUser() {
  const url = '/account/user';

  const response = await httpClient.get(url);

  return response.data;
}

export async function loadSelectedPlayer(id: number): Promise<PlayerModel> {
  const url = `account/${id}`;

  const response = await httpClient.get(url);

  return response.data;
}

export async function editSelectedPlayer(model: PlayerModel) {
  const url = '/account';

  await httpClient.patch(url, model);
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
