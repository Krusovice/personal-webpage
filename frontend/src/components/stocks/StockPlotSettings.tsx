import useState from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css";

import type PlotSettings from "./types";

type PlotSettingsProps = {
  plotSettings: PlotSettings;
}

export default function PlotSettingsArea({ plotSettings }: PlotSettingsProps ) {
  return(
    <div className={styling.plotSettings}>
      infobox
    </div>
  )
}