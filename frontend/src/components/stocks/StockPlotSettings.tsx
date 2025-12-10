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

  function toggle(key: keyof PlotSettings) {
    setPlotSettings((prev) => ({ ...prev, [key]: !prev[key]}));
  }

  return(
    <div className={styling.plotSettings}>
      <div className={styling.lastMonth}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.timespan === "lastMonth" ? styling.active : ""}`}
          onClick={() => setTimespan("lastMonth")}
        >
          Last month
        </button>
      </div>

      <div className={styling.lastYear}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.timespan === "lastYear" ? styling.active : ""}`}
          onClick={() => setTimespan("lastYear")}
        >
          Last year
        </button>
      </div>

      <div className={styling.currentYear}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.timespan === "currentYear" ? styling.active : ""}`}
          onClick={() => setTimespan("currentYear")}
        >
          Current year
        </button>
      </div>

      <div className={styling.prices}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.prices === true ? styling.active : ""}`}
          onClick={() => toggle("prices")}
        >
          Prices
        </button>
      </div>

      <div className={styling.peRatio}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.peRatio === true ? styling.active : ""}`}
          onClick={() => toggle("peRatio")}
        >
          P/E
        </button>
      </div>

      <div className={styling.relativeValues}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.relativeValues === true ? styling.active : ""}`}
          onClick={() => toggle("relativeValues")}
        >
          Relative Value
        </button>
      </div>


    </div>
  )
}