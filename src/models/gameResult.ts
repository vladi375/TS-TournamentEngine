import Power from "../enums/power";

export default interface GameResult {
    id: number;
    date: string,
    playerBlueId: number,
    playerRedId: number,
    tournamentId: number,
    identifier: string,
    winningPower?: Power | string,
    gameEndTurnId: number,
    gameEndTypeId: number
    linkToVideo?: string
}