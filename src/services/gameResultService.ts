import axios from 'axios';
import GameResultInfo from '../models/gameResultInfo';
import GameResultInfoShort from '../models/gameResultInfoShort';
import { PagedResult } from '../models/pagedResult';
import GameResult from '../models/gameResult';

export async function getGameResult(id: number): Promise<GameResultInfo> {
  const url = `/gameResult/${id}`;

  const response = await axios.get(url);

  return response.data;
}

export async function submitGameResult(request: GameResult): Promise<void> {
  const url = '/gameResult';

   await axios.post(url, request);
}

export async function getGameResults(pageIndex: number): Promise<PagedResult<GameResultInfoShort>> {
  const url = `/gameResult/?pageIndex=${pageIndex}`;

  const response = await axios.get(url);

  return response?.data;
}

export async function deleteGameResult(id: number): Promise<void> {
  const url = `/gameResult/${id}`;

  await axios.delete(url);
}

export async function editGameResult(request: GameResult): Promise<void> {
  const url = '/gameResult';

  await axios.patch(url, request);
}