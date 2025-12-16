import styling from "./../../styles/stocks/StocksStyling.module.css"
import type { SelectedTicker } from "./types"

type StocksSelectedProps = {
  selectedTickers: SelectedTicker[];
  onSelect: (ticker: string) => void;
};

export default function SelectedStocks({selectedTickers, onSelect}: StocksSelectedProps) {
  
  function tickerListContainer(ticker: string) {
    return (
      <div 
        onClick={() => {onSelect(ticker);}}
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
      {selectedTickers.map((item) => 
        tickerListContainer(item.ticker)
      )}
    </div>
  )
}