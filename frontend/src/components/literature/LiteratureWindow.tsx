import { useState } from "react";

import layoutStyling from "./../../styles/LayoutStyling.module.css"
import styling from "./../../styles/literature/LiteratureStyling.module.css";

type Tab = "app" | "docs";

export default function LiteratureWindow() {
  const [tab, setTab] = useState<Tab>("app");

  return(
    <div>
      <div className={`${styling.literaturePage} ${layoutStyling.window}`}>
        <div className={styling.tabsArea}>
          <button 
            onClick={() => setTab("app")}
            className={`${styling.tab} ${tab === "app" ? styling["tab-active"] : ""}`}
          >
            App
          </button>

          <button 
            onClick={() => setTab("docs")}
            className={`${styling.tab} ${tab === "docs" ? styling["tab-active"] : ""}`}
          >
            Docs
          </button>
        </div>
      </div>
    </div>
  )
}