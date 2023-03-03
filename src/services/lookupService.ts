import axios from "axios";
import SelectOption from "../models/selectOption";

export async function getPlayers(): Promise<SelectOption[]> {
    const url = '/lookup/player';
    const response = await axios.get(url);

    return response.data;
}

export async function getTournamentTypes(): Promise<SelectOption[]> {
    const url = '/lookup/tournamentType';
    const response = await axios.get(url);

    return response.data;
}

export async function getGameEndTurns(): Promise<SelectOption[]> {
    const url = '/lookup/gameEndTurn';
    const response = await axios.get(url);

    return response.data;
}

export async function getGameEndTypes(): Promise<SelectOption[]> {
    const url = '/lookup/gameEndType';
    const response = await axios.get(url);

    return response.data;
}