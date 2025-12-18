import type { SoilLayer } from "./types";
import { useState } from "react";

function renderEmptyRow(rowNumber: number) {
  return (
    <tr key={rowNumber}>
      <td><input type="text" id={`name_${rowNumber}`} name={`name_${rowNumber}`}/></td>
      <td><input type="text" id={`level_${rowNumber}`} name={`level_${rowNumber}`}/></td>
      <td><input type="text" id={`Eoed_${rowNumber}`} name={`Eoed_${rowNumber}`}/></td>
      <td><input type="text" id={`phi_${rowNumber}`} name={`phi_${rowNumber}`}/></td>
      <td><input type="text" id={`c_${rowNumber}`} name={`c_${rowNumber}`}/></td>
      <td><input type="text" id={`gamma_${rowNumber}`} name={`gamma_${rowNumber}`}/></td>
      <td><button type="button" id={`insert_${rowNumber}`} name={`insert_${rowNumber}`}>Insert</button></td>
      <td><button type="button" id={`remove_${rowNumber}`} name={`remove_${rowNumber}`}>Remove</button></td>
    </tr>
    );
  }

export default function SoilLayerTable() {
  const [rowCount, setRowCount] = useState<number>(0);
  const [soilLayers, setSoilLayers] = useState<SoilLayer[]>([]);

  function addRow() {
    setRowCount((prev) => prev+1);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>E<sub>oed</sub></th>
            <th>phi</th>
            <th>c</th>
            <th>gamma</th>
          </tr>
        </thead>

      <tbody>
        {renderEmptyRow(rowCount)}
      </tbody>
    </table>
    </div>
  )
}