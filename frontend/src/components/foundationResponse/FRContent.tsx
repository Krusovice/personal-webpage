import styling from "../../styles/foundationResponse/FRStyling.module.css";
import { useState } from "react";
import type { SoilLayer, FoundationResponseApiInput } from "./types";
import SoilLayerTable from "./SoilLayerTable";
import { foundationResponseApiCall } from "./api";

export default function FRContent() {
  const [soilLayers, setSoilLayers] = useState<SoilLayer[]>([{ layerNumber: 1 }]);
  const [foundationResponseApiInput, setFoundationResponseApiInput] = useState<FoundationResponseApiInput>();

  function calculateFoundationResponse() {
    console.log(soilLayers)
  }

  return (
    <>
      <form className={styling.FRArea}>
        <div className={styling.width}>
          <label htmlFor="width">Width [m]</label>
          <input id="width" name="width" type="text" required/>
        </div>

        <div className={styling.load}>
          <label htmlFor="load">Load [kPa]</label>
          <input id="load" name="load" type="text" required/>
        </div>

        <div className={styling.eccentricity}>
          <label htmlFor="eccentricity">Eccentricity [m]</label>
          <input id="eccentricity" name="eccentricity" type="text" required/>
        </div>

        <div className={styling.soilLayers}>
          <SoilLayerTable
            rows={soilLayers}
            onRowsChange={(updater) => setSoilLayers(updater)}/>
        </div>

        <div className={styling.calculate}>
          <button type="submit" onClick = { calculateFoundationResponse }>Calculate</button>
        </div>

        <div className={styling.result}>Result</div>
      </form>      
    </>
  )
}