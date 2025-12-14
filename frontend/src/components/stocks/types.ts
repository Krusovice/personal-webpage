// Data formatted received from backend api
export type StockData = {
	id: number,
	ticker: string,
	date: string,
	closing_price: number
}

// Stock data inputs for plotting the graphs
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

// Data format for each stock series after formatted stock data
export type TickerSeries = {
  ticker: string,
  color: string,
  dates: number[];
  values: number[];
};

// Inputs settings for stock plot
export type PlotSettings = {
	timespan: "lastMonth" | "lastYear" | "currentYear",
	relativeValues: boolean,
	peRatios: boolean,
	prices: boolean,
}

// Stock graph point
export type Point3 = [number, number, number];

// Stock options for plot selection
export type StockOptions = string[];