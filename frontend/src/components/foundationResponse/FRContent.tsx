import styling from "../../styles/foundationResponse/FRStyling.module.css";
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

export default function FRContent() {
  const [soilLayers, setSoilLayers] = useState<SoilLayer[]>([{ layerNumber: 1 }]);
  const [settlements, setSettlements] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function calculateFoundationResponse(e: React.FormEvent<HTMLFormElement>) {
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </div>

        <div className={styling.result}>
          Result: {settlements === null ? "-" : settlements}
        </div>
      </form>      
    </>
  )
}