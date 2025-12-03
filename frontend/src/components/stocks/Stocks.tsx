import { useEffect, useState } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css"
import StockChart3D from "./StockChart3D"
import StockFilters from "./StockFilters"

export default function StocksContent() {

  //useEffect(() => {
    // fetch from your backend or an API (you’ll likely proxy via your backend anyway)
    // setData(fetchedSeries);
  // }, []);

  return (
    <div className={styling.stocksArea}>
      <StockFilters />  
      <StockChart3D/>
    </div>
  );
}