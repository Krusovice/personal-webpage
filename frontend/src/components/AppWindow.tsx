import { ReactNode, useState } from "react";

import layoutStyling from "./../../styles/LayoutStyling.module.css";
import tabStyling from "./../../styles/AppTabsStyling.module.css";

type AppWindowProps = {
  tabs: string[];
  components: ReactNode[];
};

function createTab(tabName: string) {
  return(    
    <button 
      onClick={() => setTab(tabName)}
      className={`${tabStyling.tab} ${tab === tabName ? tabStyling["tab-active"] : ""}`}
    >
      {tabName}
    </button>
  );
}

export default function AppWindow({tabs, components}: AppWindowProps) {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return(
    <div>
      <div className={tabStyling.appWindow}>
        <div className={tabStyling.tabsArea}>
          {tabs.map(createTab)}
        </div>


        <div className={`${layoutStyling.window} ${activeTab === tabs[0] ? layoutStyling.windowLeftTabbed : ""} ${tabStyling.appArea}`}>
          {activeTab === "app" ? <StocksApp/> : <StocksDocs/>}
        </div>

      </div>
    </div>
  )
}