import styling from "./../../styles/stocks/StocksStyling.module.css"
import layoutStyling from "./../../styles/LayoutStyling.module.css"
import type { SelectedTicker } from "./types"

type StocksSelectedProps = {
  selectedTickers: SelectedTicker[];
  onSelect: (ticker: string) => void;
};

export default function SelectedStocks({selectedTickers, onSelect}: StocksSelectedProps) {
  
  function tickerListContainer(item: SelectedTicker) {
    return (
      <div 
        onClick={() => {onSelect(item.ticker);}}
        key={item.ticker}
        className={styling.selectedTickersItemContainer}
        style={{ color: item.color }}>
        {item.ticker}
      </div>
    )
  }

  return (
    <div
      className={`${styling.selectedTickers} ${layoutStyling.subWindowGrey}`}
    >
      {selectedTickers.map((item) => 
        tickerListContainer(item)
      )}
    </div>
  )
}