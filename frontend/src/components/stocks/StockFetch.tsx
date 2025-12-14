import styling from "./../../styles/stocks/StocksStyling.module.css";
import StockSearch from "./StockSearch";
import StocksSelected from "./StocksSelected"
import { useState } from "react";
import type { StockData }  from "./types";
import { fetchTickerData } from "./api"

type StockFetchProps = {
  stockOptions: string[];
  onFetchedData: (data: StockData[]) => void;
  onRemovedTicker: (ticker: string) => void;
}

export default function StockFetch({ stockOptions, onFetchedData, onRemovedTicker }: StockFetchProps) {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);

  async function addTicker(ticker: string) {
    setSelectedTickers((prev) =>
      prev.includes(ticker) ? prev : [...prev, ticker]
    );

    try {
      const data = await fetchTickerData(ticker);
      onFetchedData(data);
    } catch (e) {
      console.error(e);
    }
  }

  function removeTicker(ticker: string) {
    setSelectedTickers((prev) => prev.filter((t) => t !== ticker));
    onRemovedTicker(ticker);
  }

  return(
    <div className={styling.fetchArea}>
      <StockSearch
        options={stockOptions}
        onSelect={addTicker}
        selectedTickers={selectedTickers}
      />
        
      <StocksSelected
        tickerList={selectedTickers}
        onSelect={removeTicker}
      /> 
    </div>
  )
}


