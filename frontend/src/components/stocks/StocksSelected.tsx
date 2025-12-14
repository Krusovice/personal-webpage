import styling from "./../../styles/stocks/StocksStyling.module.css"

type StocksSelectedProps = {
  tickerList: string[];
  onSelect: (ticker: string) => void;
};

export default function SelectedStocks({tickerList, onSelect}: StocksSelectedProps) {
  
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
      {tickerList.map((ticker) => 
        tickerListContainer(ticker)
      )}
    </div>
  )
}