import { useState } from "react";
import type { SoilLayer } from "./types"
import TableInput from "./SoilLayerTableInput"

// Parsing function
function parseMaybeNumber(value: string): number | undefined {
  if (value.trim() === "") return undefined;

  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

type SoilLayerTableProps = {
  rows: SoilLayer[];
  onRowsChange: (updater: (prev: SoilLayer[]) => SoilLayer[]) => void;
};

export default function SoilLayerTable({rows, onRowsChange}: SoilLayerTableProps) {

  function addRow(newRowLayerNumber: number) {
    onRowsChange((prev) => {
      const newRows = prev.map((row) => ({ ...row })); // Cloning existing rows

      // If the newRowLayerNumber is equal to an existing rowLayerNumber,
      // the existing rowLayerNumber and above is increased.
      newRows.forEach(row => {
          if (row.layerNumber >= newRowLayerNumber) {
            row.layerNumber += 1;
          }
        })

      newRows.push({ layerNumber: newRowLayerNumber });

      newRows.sort((a, b) => a.layerNumber - b.layerNumber);

      return newRows;
    });
  }

  function removeRow(index: number) {
    onRowsChange((prev) => prev.filter((_, i) => i !== index));
  }

  function updateRow(rowNumber: number, key: keyof SoilLayer, rawValue: string) {
    onRowsChange((prev) => {
      const newTable = [...prev];
      const existingRow = newTable[rowNumber] ?? {};
      let value: string | number | undefined;

      if (key === "name") {
        if (rawValue === "") {
          value = undefined;
        } else {
          value = rawValue;
        }
      } else {
        value = parseMaybeNumber(rawValue);
      }

      newTable[rowNumber] = { ...existingRow, [key]: value };

      // if the rowNumber is the last row in the table and all keys are filled,
      // then create a new row.
      const SOIL_LAYER_KEYS = [
        "name",
        "level",
        "Eoed",
        "phi",
        "c",
        "unitWeight",
      ] as const;

      if (rowNumber == newTable.length -1) {
        for (const key of SOIL_LAYER_KEYS) {
          if (newTable[rowNumber][key] === undefined) {
            return newTable
          }
        }
        newTable.push({ layerNumber: newTable.length +1});
      }

      return newTable;
    });
  }

  function renderEmptyRow(rowIndex: number) {
    const row = rows[rowIndex] ?? {};

    return (
      <tr key={rowIndex}>
        <TableInput type="text" inputKey="name" row={row} rowIndex={rowIndex} updateRow={updateRow} />
        <TableInput type="number" inputKey="level" row={row} rowIndex={rowIndex} updateRow={updateRow} />
        <TableInput type="number" inputKey="Eoed" row={row} rowIndex={rowIndex} updateRow={updateRow} />
        <TableInput type="number" inputKey="phi" row={row} rowIndex={rowIndex} updateRow={updateRow} />
        <TableInput type="number" inputKey="c" row={row} rowIndex={rowIndex} updateRow={updateRow} />
        <TableInput type="number" inputKey="unitWeight" row={row} rowIndex={rowIndex} updateRow={updateRow} />


        {/* Insert button - currently just prints the row to the console */}
        <td>
          <button type="button" onClick={() => addRow(rowIndex)}>
            Insert
          </button>
        </td>

        {/* Remove button - removes the current row */}
        <td>
          <button type="button" onClick={() => removeRow(rowIndex)}>
            Remove
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      {/* Adds a new empty row */}
      <button type="button" onClick={addRow}>
        Add row
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Eoed</th>
            <th>Phi</th>
            <th>c</th>
            <th>Unit weight</th>
            <th />
            <th />
          </tr>
        </thead>

        {/* Render one <tr> per row in state */}
        <tbody>{rows.map((_, i) => renderEmptyRow(i))}</tbody>
      </table>
    </div>
  );
}
