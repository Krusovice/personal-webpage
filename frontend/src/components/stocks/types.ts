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

export type TickerSeries = {
  dates: number[];
  values: number[];
};

export type FormattedStockData = {
  xMin: number;
  xMax: number;
  zMin: number;
  zMax: number;
  xRange: number;
  zRange: number;
  tickerData: Record<string, TickerSeries>;
  fromDate: Date;
};

export type Point3 = [number, number, number];