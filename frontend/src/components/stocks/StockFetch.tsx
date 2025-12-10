import styling from "./../../styles/stocks/StocksStyling.module.css";
import StockSearch from "./StockSearch";
import StocksSelected from "./StocksSelected"
import { useState } from "react";
import type { StockData }  from "./types";

type StockFetchProps = {
  stockOptions: string[];
  onFetchedData: (data: StockData[]) => void;
}

export default function StockFetch({ stockOptions, onFetchedData }: StockFetchProps) {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);

  function addTicker(ticker: string) {
    setSelectedTickers((prev) =>
      prev.includes(ticker) ? prev : [...prev, ticker]
    );
    fetchStocks(ticker);
  }

  function removeTicker(ticker: string) {
    setSelectedTickers((prev) => prev.filter((t) => t !== ticker));
  }

  async function fetchStocks(selectedTicker: string) {
    const body = {
      ticker: selectedTicker,
    };

    const resp = await fetch("/api/stocks/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.error("Request failed:", resp.status);
      return;
    }

    const data = (await resp.json()) as Array<StockData>; // <-- typed parse
    onFetchedData(data);
  }

  return(
    <div className={styling.fetchArea}>
      <StockSearch
        options={stockOptions}
        onSelect={addTicker}
      />
        
      <StocksSelected
        tickerList={selectedTickers}
        onSelect={removeTicker}
      /> 
    </div>
  )
}


