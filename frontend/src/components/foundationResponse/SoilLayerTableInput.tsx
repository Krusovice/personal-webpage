import type { SoilLayer } from "./types";

type TableInputProps = {
  type: string;
  inputKey: keyof SoilLayer;
  row: SoilLayer;
  rowIndex: number;
  updateRow: (index: number, key: keyof SoilLayer, rawValue: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function TableInput({
  type,
  inputKey,
  row,
  rowIndex,
  updateRow,
  placeholder,
  disabled = false,
}: TableInputProps) {
  return (
    <td>
      <input
        type={type}
        value={(row[inputKey] ?? "") as string | number}
        onChange={(e) => updateRow(rowIndex, inputKey, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </td>
  );
}
