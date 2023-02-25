import Power from './../enums/power';

export default interface GameResultInfo {
    id: number,
	date: Date
	playerBlueId: number,
	playerBlueName: string,
	playerBlueCountry: string,
	playerRedId: number,
	playerRedName: string,
	playerRedCountry: string,
	tournamentName: string,
	identifier: string,
	winningPower?: Power,
	gameEndTurnId: number,
	gameEndTurnName: string,
	gameEndTypeId: number,
	gameEndTypeName: string,
	playerBlueOldRating: number,
	playerBlueNewRating: number,
	playerRedOldRating: number,
	playerRedNewRating: number;
	linkToVideo: string
}