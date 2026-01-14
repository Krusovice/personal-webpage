import AppWindow from "./../components/AppWindow"
import StocksApp from "./../components/stocks/StocksApp"
import StocksDocs from "./../components/stocks/StocksDocs"


export default function Stockspage() {
  return (
    <div>
      <AppWindow
        tabs = {["App", "Docs"]}
        components = {[StocksApp, StocksDocs]}
      />
    </div>

  )
}
