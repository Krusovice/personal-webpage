import { useEffect, useState } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"
import StockChart3D from "./StockChart3D"
import StockFetch from "./StockFetch"
import type { StockData }  from "./types";

const STOCK_OPTIONS = ["AAPL", "MSFT", "TSLA"];

export default function StocksContent() {
  const [stockData, setStockData] = useState<Array<StockData>>([]);


  return (
    <div className={styling.stocksArea}>
      <StockFetch 
        stockOptions={STOCK_OPTIONS}
        onFetchedData={setStockData}
      />  
      <StockChart3D
        stockData={stockData}
      />
    </div>
  );
}