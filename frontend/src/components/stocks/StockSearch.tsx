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
    <div className={styling.searchBar}>

      <div ref={wrapperRef} className = { styling.searchBarDropdown } >

        <input
          type="text"
          value={query}
          placeholder="Type in a Stock"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
        />

        {open && filtered.length > 0 && (
          <div className = { styling.searchBarDropdownMenu } >
            
            {filtered.map((opt) => (
              <div
                key={opt}
                className={ styling.searchBarDropdownOption }
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

    </div>
  );
}