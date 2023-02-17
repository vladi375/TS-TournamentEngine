import axios from 'axios';

export async function getPlayersData() {
  const url = '/player';

  const response = await axios.get(url);

  return response?.data?.items;
}
