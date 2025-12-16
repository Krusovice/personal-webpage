import { useState, useEffect, useMemo } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"

import type { StockData, PlotSettings, StockOptions, SelectedTickers }  from "./types";
import { fetchStockOptions, fetchTickerData } from "./api"
import { formatStockData } from "./dataFunctions"

import StockChart3D from "./StockChart3D"
import StockSearch from "./StockSearch";
import StocksSelected from "./StocksSelected"
import PlotSettingsArea from "./StockPlotSettings"

/* Stocks app 

/// Data structure ///
StockOptions is created on render through a backend api
and contains all stock options available in the database.

For each Ticker selected, the data is fetched from API.
The StockData array then extended with the data,
and given as an input to the formatStockData function.
FormattedStockData then contains tickerData <TickerSeries>
and meta data for plots.

PlotSettings contains inputs for plots.

StockContent owns FormattedStockData and PlotSettings.


/// Component structure ///
StockContent
  StockSearch
  StockSelected
  PlotSettingsArea
  StockChart
*/

export default function StockContent() {
  const [plotSettings, setPlotSettings] = useState<PlotSettings>({
    timespan: "currentYear",
    relativeValues: true,
    peRatios: false,
    prices: true,
  });
  const [stockOptions, setStockOptions] = useState<StockOptions>([]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<SelectedTicker[]>([]);
  
  const TICKER_COLORS = ["red", "blue", "green"];

  const formattedStockData = useMemo(
  () => formatStockData(stockData, plotSettings, TICKER_COLORS),
  [stockData, plotSettings, TICKER_COLORS]
);

  function setTimespan(input: PlotSettings["timespan"]) {
    setPlotSettings((prev) => ({ ...prev, timespan: input}));
  }

  function togglePlotSetting(key: keyof PlotSettings) {
    setPlotSettings((prev) => ({ ...prev, [key]: !prev[key]}));
  }

  async function addTicker(ticker: string) {
    setSelectedTickers((prev) => {
      if (prev.some((t) => t.ticker === ticker)) return prev;  
      
      const color = TICKER_COLORS[0];

      return [...prev, { ticker, color }];
    });
    
    try {
      const newStockData = await fetchTickerData(ticker);
      setStockData((prev) => [...prev, ...newStockData]);
      

    } catch (e) {
      console.error(e);
    }
  }

  function removeTicker(ticker: string) {
    setSelectedTickers((prev) => prev.filter((item) => item.ticker !== ticker));
    setStockData((prev) => prev.filter((item) => item.ticker !== ticker));
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
        <div className={styling.fetchArea}>
          <StockSearch
            options={stockOptions}
            onSelect={addTicker}
            selectedTickers={selectedTickers}
          />
            
          <StocksSelected
            selectedTickers={selectedTickers}
            onSelect={removeTicker}
          /> 
        </div>

        <StockChart3D
          formattedStockData={formattedStockData}
        />

        <PlotSettingsArea
          plotSettings={plotSettings}
          onSetTimespan={setTimespan}
          onTogglePlotSetting={togglePlotSetting}
        />
      </div>
  );
}