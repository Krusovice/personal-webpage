import styling from "./../../styles/stocks/StocksStyling.module.css";
import StockSearch from "./StockSearch";
import { useState } from "react";

const STOCK_OPTIONS = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA"];

export default function StockFilters () {
  const [stockQuery, setStockQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Searching for:", stockQuery);
    // here you can trigger your fetch / filter / whatever
  }

  return(
    <div className={styling.filtersArea}>

        <div className={styling.searchBar}>
          <StockSearch
            options={STOCK_OPTIONS}         // list of possible stocks
            query={stockQuery}              // current value
            onChange={setStockQuery}        // update value when user types
            onSelect={(val) => {
              console.log("Selected from list:", val);
              setStockQuery(val);          // optional, already set in onClick
            }}
          />
        </div>

        <div className={styling.selectedStocks}>
          selectedStocks
        </div>

        <div className={styling.dateRange}>
          dateRange
        </div>

        <div className={styling.fetchButton}>
          fetchButton
        </div>

        <div className={styling.selectedStocks}>
          selectedStocks
        </div>

    </div>
  )
}


