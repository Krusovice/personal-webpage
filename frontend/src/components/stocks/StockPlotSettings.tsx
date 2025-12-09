import { useState } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css";

import type PlotSettings from "./types";

type PlotSettingsProps = {
  plotSettings: PlotSettings;
}

export default function PlotSettingsArea({ plotSettings }: PlotSettingsProps ) {
  return(
    <div className={styling.plotSettings}>
      <div className={styling.lastMonth}>
        <button>
          Last month
        </button>
      </div>

      <div className={styling.lastYear}>
        <button>
          Last year
        </button>
      </div>

      <div className={styling.currentYear}>
        <button>
          Current year
        </button>
      </div>
    </div>
  )
}