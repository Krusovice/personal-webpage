import styling from "./../../styles/stocks/StocksStyling.module.css";
import layoutStyling from "./../../styles/LayoutStyling.module.css"
import type  { PlotSettings } from "./types";

type PlotSettingsProps = {
  plotSettings: PlotSettings,
  onSetTimespan: (input: PlotSettings["timespan"]) => void;
  onTogglePlotSetting: (key: keyof PlotSettings) => void;
};

export default function PlotSettingsArea({ plotSettings, onSetTimespan, onTogglePlotSetting }: PlotSettingsProps ) {

  return(
    <div className={`${styling.plotSettings} ${layoutStyling.subWindowDark}`}>
      <div className={styling.lastMonth}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.timespan === "lastMonth" ? styling.active : ""}`}
          onClick={() => onSetTimespan("lastMonth")}
        >
          Last month
        </button>
      </div>

      <div className={styling.lastYear}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.timespan === "lastYear" ? styling.active : ""}`}
          onClick={() => onSetTimespan("lastYear")}
        >
          Last year
        </button>
      </div>

      <div className={styling.currentYear}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.timespan === "currentYear" ? styling.active : ""}`}
          onClick={() => onSetTimespan("currentYear")}
        >
          Current year
        </button>
      </div>

      <div className={styling.prices}>
        <button disabled
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.prices === true ? styling.active : ""}`}
          onClick={() => onTogglePlotSetting("prices")}
        >
          Prices
        </button>
      </div>

      <div className={styling.peRatios}>
        <button disabled
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.peRatios === true ? styling.active : ""}`}
          onClick={() => onTogglePlotSetting("peRatios")}
        >
          P/E
        </button>
      </div>

      <div className={styling.relativeValues}>
        <button
          type="button"
          className={`${styling.plotSettingOption} ${plotSettings.relativeValues === true ? styling.active : ""}`}
          onClick={() => onTogglePlotSetting("relativeValues")}
        >
          Relative Value
        </button>
      </div>


    </div>
  )
}