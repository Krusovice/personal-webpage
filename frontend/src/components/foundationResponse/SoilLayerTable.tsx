import { useState } from "react";
import type { SoilLayer } from "./types"


// Parsing function
function parseMaybeNumber(value: string): number | undefined {
  if (value.trim() === "") return undefined;

  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

// Create a table input
function createTableInput(type: string, inputKey: keyof SoilLayer, row: SoilLayer, rowIndex: number) {
  return (
    <td>
      <input
        type={type}
        value={row[inputKey] ?? ""} // controlled input must always receive a string
        onChange={(e) => updateRow(rowIndex, inputKey, e.target.value)}
      />
    </td>
    )}


export default function SoilLayerTable() {
  const [rows, setRows] = useState<SoilLayer[]>([{ layerNumber: 1 }]);

  function addRow() {
    setRows((prev) => [...prev, { layerNumber: prev.length + 1 }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  /**
   * Core update function: updates ONE field in ONE row.
   *
   * index: which row in rows[] to update
   * key: which property on SoilLayer to update ("name", "phi", etc.)
   * rawValue: the string coming from the HTML input
   *
   * The <K extends SoilLayerKey> part keeps TypeScript aware that:
   * - key is a valid SoilLayer key
   * - value we assign matches the expected type for that key
   */
  function updateRow(rowNumber: number, key: keyof SoilLayer, rawValue: string) {
    setRows((prev) => {
      const newTable = [...prev];
      const existingRow = newTable[rowNumber];

      // parse all keys but name into numbers
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
      return newTable;
    });
  }

  function renderEmptyRow(rowIndex: number) {
    const row = rows[rowIndex] ?? {};

    return (
      <tr key={rowIndex}>
        {createTableInput("text", "name", row, rowIndex)}
        {createTableInput("number", "level", row, rowIndex)}
        {createTableInput("number", "Eoed", row, rowIndex)}
        {createTableInput("number", "phi", row, rowIndex)}
        {createTableInput("number", "c", row, rowIndex)}
        {createTableInput("number", "unitWeight", row, rowIndex)}

        {/* Insert button - currently just prints the row to the console */}
        <td>
          <button type="button" onClick={() => console.log("Insert row:", row)}>
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

      {/* Debugging: shows current state live as JSON */}
      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
}
