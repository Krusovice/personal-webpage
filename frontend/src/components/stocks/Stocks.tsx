import { useEffect, useState } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"
import StockChart3D from "./StockChart3D"
import StockFetch from "./StockFetch"
import PlotSettingsArea from "./StockPlotSettings"
import type { StockData, PlotSettings }  from "./types";

const STOCK_OPTIONS = ["AAPL", "MSFT", "TSLA"];

export default function StocksContent() {
  const [stockData, setStockData] = useState<Array<StockData>>([]);
  const [plotSettings, setPlotSettings] = useState<PlotSettings>({
    timespan: "currentYear",
    relativeValues: true,
    peRatios: false,
    prices: true,
  });

  // debugging
  console.log(plotSettings);

  return (
    <div className={styling.stocksArea}>
      <StockFetch 
        stockOptions={STOCK_OPTIONS}
        onFetchedData={setStockData}
      />

      <StockChart3D
        stockData={stockData}
        plotSettings={plotSettings}
      />

      <PlotSettingsArea
        plotSettings={plotSettings}
        setPlotSettings={setPlotSettings}
      />
    </div>
  );
}