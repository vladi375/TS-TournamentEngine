import Power from "../enums/power";

export default interface SubmitGameResultRequest {
    date: string,
    playerBlueId: number,
    playerRedId: number,
    tournamentId: number,
    identifier: string,
    winningPower?: Power,
    gameEndTurnId: number,
    gameEndTypeId: number
    linkToVideo: string
}