import { useState, useEffect } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"
import StockChart3D from "./StockChart3D"
import StockFetch from "./StockFetch"
import PlotSettingsArea from "./StockPlotSettings"
import type { StockData, PlotSettings }  from "./types";

type StockOptions = string[];

async function fetch_stock_options(): StockOptions {
  const resp = await fetch("/api/stocks/fetch_options", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!resp.ok) {
    throw new Error(`Request failed: ${resp.status}`);
  }

  return (await resp.json()) as StockOptions;
}

export default function StocksContent() {
  const [stockOptions, setStockOptions] = useState<StockOptions>([]);
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

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const options = await fetch_stock_options();
        if (alive) setStockOptions(options);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, []); // run once on mount

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