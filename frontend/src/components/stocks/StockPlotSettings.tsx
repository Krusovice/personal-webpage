import { useState } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css";

import type PlotSettings from "./types";

type PlotSettingsProps = {
  plotSettings: PlotSettings,
  setPlotSettings: (value: PlotSettings) => void,
};

export default function PlotSettingsArea({ plotSettings, setPlotSettings }: PlotSettingsProps ) {
  
  function setTimespan(input: PlotSettings["timespan"]) {
    setPlotSettings((prev) => ({ ...prev, timespan: input}));
  }

  return(
    <div className={styling.plotSettings}>
      <div className={styling.lastMonth}>
        <button
          type="button"
          className={`${styling.timespanOption} ${plotSettings.timespan === "lastMonth" ? styling.active : ""}`}
          onClick={() => setTimespan("lastMonth")}
        >
          Last month
        </button>
      </div>

      <div className={styling.lastYear}>
        <button
          type="button"
          className={`${styling.timespanOption} ${plotSettings.timespan === "lastYear" ? styling.active : ""}`}
          onClick={() => setTimespan("lastYear")}
        >
          Last year
        </button>
      </div>

      <div className={styling.currentYear}>
        <button
          type="button"
          className={`${styling.timespanOption} ${plotSettings.timespan === "currentYear" ? styling.active : ""}`}
          onClick={() => setTimespan("currentYear")}
        >
          Current year
        </button>
      </div>


    </div>
  )
}