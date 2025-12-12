import { useState } from "react";
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

  function addStockData(newStockData: StockData[]) {
    setStockData((prev) => [...prev, ...newStockData]);
  }

  function removeStockData(ticker: string) {
    setStockData((prev) => prev.filter((item) => item.ticker !== ticker));
  }

  function setTimespan(input: PlotSettings["timespan"]) {
    setPlotSettings((prev) => ({ ...prev, timespan: input}));
  }

  function togglePlotSetting(key: keyof PlotSettings) {
    setPlotSettings((prev) => ({ ...prev, [key]: !prev[key]}));
  }

  return (
    <div className={styling.stocksArea}>
      <StockFetch 
        stockOptions={STOCK_OPTIONS}
        onFetchedData={addStockData}
        onRemovedTicker={removeStockData}
      />

      <StockChart3D
        stockDataList={stockData}
        plotSettings={plotSettings}
      />

      <PlotSettingsArea
        plotSettings={plotSettings}
        onSetTimespan={setTimespan}
        onTogglePlotSetting={togglePlotSetting}
      />
    </div>
  );
}