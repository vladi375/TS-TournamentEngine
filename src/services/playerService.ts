import httpClient from './httpClient';

export async function getPlayersData(pageIndex: number) {
  const url = `/player/?pageIndex=${pageIndex}`;

  const response = await httpClient.get(url);

  return response?.data;
}
