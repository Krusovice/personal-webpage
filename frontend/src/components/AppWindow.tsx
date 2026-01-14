import { ComponentType, useState } from "react";

import layoutStyling from "./../styles/LayoutStyling.module.css";
import tabStyling from "./../styles/AppTabsStyling.module.css";

type AppWindowProps = {
  tabs: string[];
  components: ComponentType[];
};



export default function AppWindow({tabs, components}: AppWindowProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  function createTab(tabName: string) {
    return(    
      <button 
        key={tabName}
        onClick={() => setActiveTab(tabName)}
        className={`${tabStyling.tab} ${activeTab === tabName ? tabStyling["tab-active"] : ""}`}
      >
        {tabName}
      </button>
    );
  }

  return(
    <div>
      <div className={tabStyling.appWindow}>
        <div className={tabStyling.tabsArea}>
          {tabs.map(createTab)}
        </div>


        <div className={`${layoutStyling.window} ${activeTab === tabs[0] ? layoutStyling.windowLeftTabbed : ""} ${tabStyling.appArea}`}>
          {tabs.map((tab, idx) => {
            if (tab === activeTab) {
              const Component = components[idx];
              return <Component />;
            }
            return null;
          })}
        </div>

      </div>
    </div>
  )
}