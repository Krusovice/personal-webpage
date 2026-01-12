import { useState } from "react";

import layoutStyling from "./../../styles/LayoutStyling.module.css";
import styling from "./../../styles/literature/LiteratureStyling.module.css";
import tabStyling from "./../../styles/AppTabsStyling.module.css";

type Tab = "app" | "docs";

export default function LiteratureWindow() {
  const [tab, setTab] = useState<Tab>("app");

  return(
    <div>
      <div className={styling.literaturePage}>

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


        <div className={`${layoutStyling.window} ${styling.literatureApp}`}>
          literatureApp
        </div>

      </div>
    </div>
  )
}