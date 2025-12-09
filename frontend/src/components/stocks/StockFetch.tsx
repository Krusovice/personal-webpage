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
  }

  function removeTicker(ticker: string) {
    setSelectedTickers((prev) => prev.filter((t) => t !== ticker));
  }

  async function fetchStocks(
    timeInput: "7days" | "30days" | "currentYear",
    ) {
    
    // Calculating the date that should be fetched from
    const now = new Date();
    const fromDate = new Date(now);

    if (timeInput === "30days") {
      fromDate.setDate(fromDate.getDate() - 30);
    } else if (timeInput === "365days") {
      fromDate.setDate(fromDate.getDate() - 365);
    } else if (timeInput === "currentYear") {
      fromDate.setFullYear(now.getFullYear(), 0, 1);
    }

    // Formatting for passing to api
    const fromDateStr = fromDate.toISOString().slice(0, 10);

    const body = {
      fromDate: fromDateStr,
      tickers: selectedTickers,
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


