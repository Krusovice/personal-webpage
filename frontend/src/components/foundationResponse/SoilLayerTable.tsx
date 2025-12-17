import type { SoilLayer } from "./types";
import { useState } from "react";


function renderRow (rowNumber: number) {
  return (
    <tr key={rowNumber}>
      <td><input type="text" id={`name_${rowNumber}`} name={`name_${rowNumber}`}/></td>
      <td><input type="text" id={`level_${rowNumber}`} name={`level_${rowNumber}`}/></td>
      <td><input type="text" id={`Eoed_${rowNumber}`} name={`Eoed_${rowNumber}`}/></td>
      <td><input type="text" id={`phi_${rowNumber}`} name={`phi_${rowNumber}`}/></td>
      <td><input type="text" id={`c_${rowNumber}`} name={`c_${rowNumber}`}/></td>
      <td><input type="text" id={`gamma_${rowNumber}`} name={`gamma_${rowNumber}`}/></td>
    </tr>
  )
}

export default function SoilLayerTable() {
  const [rowCount, setRowCount] = useState<number>(0);

  function addRow() {
    setRowCount((prev) => prev+1);
  }

  return (
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
        {addRow(rowCount)};
      </tbody>
    </table>
  )
}