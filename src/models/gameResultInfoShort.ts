import Power from "../enums/power";

export default interface GameResultInfoShort {
    id: number,
	date: Date
	playerBlueName: string,
	playerBlueCountry: string,
	playerRedName: string,
	playerRedCountry: string,
	tournamentName: string,
	identifier: string,
	winningPower?: Power
}