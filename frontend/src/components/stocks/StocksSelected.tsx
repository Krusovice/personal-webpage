import useState from "react"
import styling from "./../../styles/stocks/StocksStyling.module.css"

type StocksSelectedProps = {
  tickerList: string[];
  onSelect: (ticker: string) => void;
};

export default function SelectedStocks({tickerList, onSelect}: StocksSelectedProps) {
  
  function tickerListContainer(ticker) {
    return (
      <div 
        onClick={() => {onSelect?.(ticker);}}
        key={ticker}
        className={styling.stocksSelectedItemContainer}>
        {ticker}
      </div>
    )

  }

  return (
    <div
      className={styling.stocksSelected}
    >
      {tickerList.map((ticker) => 
        tickerListContainer(ticker)
      )}
    </div>
  )

  // A box with a list of selected stocks
  // The StockSearch component can add stocks to the list
  // A click on a component on the list will remove the stock from the list
}