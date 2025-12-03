import styling from "./../../styles/stocks/StocksStyling.module.css"

export default function StockFilters () {

  return(
    <div className={styling.filtersArea}>
      <div className={styling.searchBar}>
        searchBar
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