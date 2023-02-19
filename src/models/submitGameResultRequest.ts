import Power from "../enums/power";

export default interface SubmitGameResultRequest {
    date: string,
    playerBlueId: number,
    playerRedId: number,
    tournament: number,
    identifier: string,
    winningPower?: Power,
    gameEndTurn: number,
    gameEndType: number
    linkToVideo: string
}