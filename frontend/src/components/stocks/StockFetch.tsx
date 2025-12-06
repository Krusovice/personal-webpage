import styling from "./../../styles/stocks/StocksStyling.module.css";
import StockSearch from "./StockSearch";
import StocksSelected from "./StocksSelected"
import { useState } from "react";
import type { StockData }  from "./types";

const STOCK_OPTIONS = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA"];

export default function StockFetch () {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [stockData, setStockData] = useState<Array<StockData>>([]);

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

    if (timeInput === "7days") {
      fromDate.setDate(fromDate.getDate() - 7);
    } else if (timeInput === "30days") {
      fromDate.setDate(fromDate.getDate() - 30);
    } else if (timeInput === "currentYear") {
      fromDate.setFullYear(now.getFullYear(), 0, 1);
    }

    // Formatting for passing to api
    const fromDateStr = fromDate.toISOString().slice(0, 10);

    const body = {
      fromDate: fromDateStr,
      tickers: selectedTickers,
    };

    const resp = await fetch("/api/stocks", {
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
    setStockData(data);
  }

  return(
    <div className={styling.filtersArea}>

      <StockSearch
        options={STOCK_OPTIONS}
        onSelect={addTicker}
      />
        
      <StocksSelected
        tickerList={selectedTickers}
        onSelect={removeTicker}
      /> 


      <div className={styling.lastMonth}>
        <button type="button" onClick={() => fetchStocks("7days")}>
          Last month
        </button>
      </div>

      <div className={styling.lastYear}>
        <button type="button" onClick={() => fetchStocks("30days")}>
          Last year
        </button>
      </div>

      <div className={styling.currentYear}>
        <button type="button" onClick={() => fetchStocks("currentYear")}>
          Current year
        </button>
      </div>

    </div>
  )
}


