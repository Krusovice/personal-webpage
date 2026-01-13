import { useState } from "react";

import layoutStyling from "./../../styles/LayoutStyling.module.css";
import styling from "./../../styles/stocks/StocksStyling.module.css";
import tabStyling from "./../../styles/AppTabsStyling.module.css";

import StocksApp from "./StocksApp"
import StocksDocs from "./StocksDocs"

type Tab = "app" | "docs";

export default function StocksWindow() {
  const [tab, setTab] = useState<Tab>("app");

  return(
    <div>
      <div className={styling.stocksPage}>

        <div className={tabStyling.tabsArea}>
          <button 
            onClick={() => setTab("app")}
            className={`${tabStyling.tab} ${tab === "app" ? tabStyling["tab-active"] : ""}`}
          >
            App
          </button>

          <button 
            onClick={() => setTab("docs")}
            className={`${tabStyling.tab} ${tab === "docs" ? tabStyling["tab-active"] : ""}`}
          >
            Docs
          </button>
        </div>


        <div className={`${layoutStyling.window} ${tab === "app" ? layoutStyling.windowLeftTabbed : ""} ${styling.stocksApp}`}>
          {tab === "app" ? <StocksApp/> : <StocksDocs/>}
        </div>

      </div>
    </div>
  )
}