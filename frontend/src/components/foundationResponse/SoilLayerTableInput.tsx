import type { SoilLayer } from "./types";

type TableInputProps = {
  type: string;
  inputKey: keyof SoilLayer;
  row: SoilLayer;
  rowIndex: number;
  updateRow: (index: number, key: keyof SoilLayer, rawValue: string) => void;
};

export default function TableInput({
  type,
  inputKey,
  row,
  rowIndex,
  updateRow,
}: TableInputProps) {
  return (
    <td>
      <input
        type={type}
        value={(row[inputKey] ?? "") as string | number}
        onChange={(e) => updateRow(rowIndex, inputKey, e.target.value)}
      />
    </td>
  );
}
