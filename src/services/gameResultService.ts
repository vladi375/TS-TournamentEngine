import axios from 'axios';
import SubmitGameResultRequest from './../models/submitGameResultRequest';

export async function getGameResult(id: number) {
  const url = `/gameResult/${id}`;

  const response = await axios.get(url);

  return response.data;
}

export async function submitGameResult(request: SubmitGameResultRequest) {
    const url = '/gameResult';

    await axios.post(url, request);
}

export async function getGameResults(pageIndex: number) {
  const url = `/gameResult/?pageIndex=${pageIndex}`;

  const response = await axios.get(url);

  return response?.data;
}

export async function deleteGameResult(id: number) {
  const url = `/gameResult/${id}`;

  await axios.delete(url);
}