export type StockData = {
	id: number,
	ticker: string,
	date: string,
	closing_price: number
}

export type PlotSettings = {
	timespan: "lastMonth" | "lastYear" | "currentYear",
	relativeValues: boolean,
	peRatios: boolean,
	prices: boolean,
}