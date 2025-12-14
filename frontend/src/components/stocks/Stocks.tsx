import { useState, useEffect } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"

import type { StockData, PlotSettings, StockOptions }  from "./types";
import { fetchStockOptions } from "./api"

import StockChart3D from "./StockChart3D"
import StockFetch from "./StockFetch"
import PlotSettingsArea from "./StockPlotSettings"

export default function StocksContent() {
  const [plotSettings, setPlotSettings] = useState<PlotSettings>({
    timespan: "currentYear",
    relativeValues: true,
    peRatios: false,
    prices: true,
  });
  const [stockOptions, setStockOptions] = useState<StockOptions>([]);
  const [stockData, setStockData] = useState<Array<StockData>>([]);

  //const stockColors = ["red", "blue", "green"];

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

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const options = await fetchStockOptions();
        if (alive) setStockOptions(options);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className={styling.stocksArea}>
      <StockFetch 
        stockOptions={stockOptions}
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