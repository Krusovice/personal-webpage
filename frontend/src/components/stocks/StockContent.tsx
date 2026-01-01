import { useState, useEffect, useMemo } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"
import layoutStyling from "./../../styles/LayoutStyling.module.css"

import type { StockData, PlotSettings, StockOptions, SelectedTicker }  from "./types";
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

When the ticker is selected, selectedTickers is appended
with the ticker, and the ticker is given a color from 
TICKER_COLOR_OPTIONS. When plotting, selectedTickers are
also given as an argument, to provide colors to the plots
without changing the colors when graphs are removed from
the plot. selectedTickers are also used to show colors in
the StockSelected component.

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
  
  const TICKER_COLOR_OPTIONS = ["red","blue","green","orange","purple","cyan","magenta","yellow","brown","teal"] as const;

  const formattedStockData = useMemo(
  () => formatStockData(stockData, plotSettings, selectedTickers),
  [stockData, plotSettings]
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
      
      // Finding a color that has not been used
      const color = TICKER_COLOR_OPTIONS.find((c) => 
        !selectedTickers.some((t) => t.color === c)) ?? "black";
      
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
      <div className={`${styling.stocksArea} ${layoutStyling.window}`}>
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