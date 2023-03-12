import GameResultInfo from '../models/gameResultInfo';
import GameResultInfoShort from '../models/gameResultInfoShort';
import { PagedResult } from '../models/pagedResult';
import GameResult from '../models/gameResult';
import httpClient from './httpClient';

export async function getGameResultInfo(id: number): Promise<GameResultInfo> {
  const url = `/gameResult/${id}/info`;

  const response = await httpClient.get(url);

  return response.data;
}

export async function getGameResult(id: number): Promise<GameResult> {
  const url = `/gameResult/${id}`;

  const response = await httpClient.get(url);

  return response.data;
}

export async function submitGameResult(request: GameResult): Promise<void> {
  const url = '/gameResult';

   await httpClient.post(url, request);
}

export async function getGameResults(pageIndex: number): Promise<PagedResult<GameResultInfoShort>> {
  const url = `/gameResult/?pageIndex=${pageIndex}`;

  const response = await httpClient.get(url);

  return response?.data;
}

export async function deleteGameResult(id: number): Promise<void> {
  const url = `/gameResult/${id}`;

  await httpClient.delete(url);
}

export async function editGameResult(request: GameResult): Promise<void> {
  const url = '/gameResult';

  await httpClient.patch(url, request);
}