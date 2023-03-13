import SelectOption from "../models/selectOption";
import httpClient from './httpClient';

export async function getPlayers(): Promise<SelectOption[]> {
    const url = '/lookup/player';
    const response = await httpClient.get(url);

    return response.data;
}

export async function getTournamentTypes(): Promise<SelectOption[]> {
    const url = '/lookup/tournamentType';
    const response = await httpClient.get(url);

    return response.data;
}

export async function getGameEndTurns(): Promise<SelectOption[]> {
    const url = '/lookup/gameEndTurn';
    const response = await httpClient.get(url);

    return response.data;
}

export async function getGameEndTypes(): Promise<SelectOption[]> {
    const url = '/lookup/gameEndType';
    const response = await httpClient.get(url);

    return response.data;
}

export async function getCountries(): Promise<SelectOption[]> {
    const url = '/lookup/country';
    const response = await httpClient.get(url);

    return response.data;
}