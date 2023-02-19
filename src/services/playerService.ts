import axios from 'axios';

export async function getPlayersData(pageIndex: number) {
  const url = `/player/?pageIndex=${pageIndex}`;

  const response = await axios.get(url);

  return response?.data;
}
