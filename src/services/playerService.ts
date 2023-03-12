import httpClient from './httpClient';
import Player from './../models/player';
import SignUp from '../models/signUp';

export async function getPlayersData(pageIndex: number) {
  const url = `/player/?pageIndex=${pageIndex}`;

  const response = await httpClient.get(url);

  return response?.data;
}

export async function getPLayer(id: number): Promise<Player> {
  const url = `player/${id}`;

  const response = await httpClient.get(url);

  return response.data;
}

export async function addPlayer(model: SignUp) {
  const url = '/player';

  await httpClient.post(url, model);
}

export async function editPlayer(model: Player) {
  const url = '/player';

  await httpClient.patch(url, model);
}
