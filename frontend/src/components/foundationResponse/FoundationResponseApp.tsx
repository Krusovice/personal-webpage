import styling from "../../styles/foundationResponse/FRStyling.module.css";
import layoutStyling from "../../styles/LayoutStyling.module.css";

import { useState } from "react";
import type { SoilLayer, FoundationResponseApiInput } from "./types";
import SoilLayerTable from "./SoilLayerTable";
import { foundationResponseApiCall } from "./api";

function isCompleteSoilLayer(row: SoilLayer) {
  return (
    row.layerNumber !== undefined &&
    row.name !== undefined &&
    row.level !== undefined &&
    row.Eoed !== undefined &&
    row.phi !== undefined &&
    row.c !== undefined &&
    row.unitWeight !== undefined
  );
}

export default function FoundationResponseApp() {
  const [soilLayers, setSoilLayers] = useState<SoilLayer[]>([{ layerNumber: 1 }]);
  const [settlements, setSettlements] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function calculateFoundationResponse(e: React.FormEvent<HTMLFormElement>) {
    console.log(soilLayers);
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const width = Number(formData.get("width"));
      const load = Number(formData.get("load"));
      const eccentricity = Number(formData.get("eccentricity"));

      if (![width, load, eccentricity].every(Number.isFinite)) {
        throw new Error("Width, load, and eccentricity must be valid numbers.");
      }

      const cleanedSoilLayers = soilLayers
        .filter(isCompleteSoilLayer);

      const foundationResponseInput: FoundationResponseApiInput = {
        width,
        load,
        eccentricity,
        soilLayers: cleanedSoilLayers,
      };

      const result = await foundationResponseApiCall(foundationResponseInput);
      console.log(result)

      // Adjust depending on what your API returns:
      // If API returns { settlements: number }:
      // setSettlements(result.settlements);
      // If API returns number directly:
      setSettlements(result as unknown as number);
    } catch (err) {
      console.error(err);
      setSettlements(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className={styling.FRArea} onSubmit={calculateFoundationResponse}>

        <div className={`${layoutStyling.subWindowDark} ${styling.inputs}`}>
          <div className={styling.width}>
            <label htmlFor="width">Width [m]</label>
            <input id="width" name="width" type="text" required/>
          </div>

          <div className={styling.length}>
            <label htmlFor="length">Length [m]</label>
            <input id="length" name="length" type="text" disabled placeholder="inf"/>
          </div>

          <div className={styling.load}>
            <label htmlFor="load">Load [kPa]</label>
            <input id="load" name="load" type="text" required/>
          </div>

          <div className={styling.eccentricity}>
            <label htmlFor="eccentricity">Eccentricity [m]</label>
            <input id="eccentricity" name="eccentricity" type="text" required/>
          </div>
        </div>

        <div className={`${styling.soilLayers} ${layoutStyling.subWindowGrey}`}>
          <SoilLayerTable
            rows={soilLayers}
            onRowsChange={(updater) => setSoilLayers(updater)}/>
        </div>

        <div className={`${layoutStyling.subWindowDark} ${styling.outputs}`}>
          <div className={styling.calculate}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Calculating..." : "Calculate"}
            </button>
          </div>

          <div className={styling.result}>
            {settlements === null ? "-" : settlements.toFixed(2)} mm
          </div>
        </div>
        
      </form>      
    </>
  )
}