import { useState, useEffect, useRef } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css";


type AutoCompleteInputProps = {
  options: string[];
  query: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
};

export default function StockSearch({
  options,
  query,
  onChange,
  onSelect,
}: AutoCompleteInputProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const filtered = options.filter((opt) => 
    opt.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return(
    <div ref={wrapperRef} style={{ position: "relative", width: "250px" }}>
      <input
        type="text"
        value={query}
        placeholder="Type in a Stock"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        style={{ width: "100%", boxSizing: "border-box", padding: "8px" }}
      />

      {open && filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filtered.map((opt) => (
            <div
              key={opt}
              style={{ padding: "6px 8px", cursor: "pointer" }}
              onClick={() => {
                onChange(opt);
                onSelect?.(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}