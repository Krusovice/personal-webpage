import useState from "react"
import styling from "./../../styles/stocks/StocksStyling.module.css"

export default function SelectedStocks() {
  const [selectedStocks, setSelectedStocks] = useState("");

  function addStock() {
    // function to add a stock to the list
  }

  function removeStock() {
    // function to remove a stock from the list
  }

  // A box with a list of selected stocks
  // The StockSearch component can add stocks to the list
  // A click on a component on the list will remove the stock from the list
}