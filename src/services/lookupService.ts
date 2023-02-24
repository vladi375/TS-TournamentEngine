import axios from "axios";

export async function getPlayers() {
    const url = '/lookup/player';
    const response = await axios.get(url);

    return response.data;
}

export async function getTournamentTypes() {
    const url = '/lookup/tournamentType';
    const response = await axios.get(url);

    return response.data;
}

export async function getGameEndTurns() {
    const url = '/lookup/gameEndTurn';
    const response = await axios.get(url);

    return response.data;
}

export async function getGameEndTypes() {
    const url = '/lookup/gameEndType';
    const response = await axios.get(url);

    return response.data;
}