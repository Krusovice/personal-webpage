import { useState, useEffect, useRef } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css";

type StockSearchProps = {
  options: string[];
  onSelect: (ticker: string) => void;
  selectedTickers: string[];
};

export default function StockSearch({ options, onSelect, selectedTickers }: StockSearchProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filtered = options.filter((option) => 
    !selectedTickers.includes(option)
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return(
    <div className={styling.searchBar}>

      <div ref={dropdownRef} className = { styling.searchBarDropdown } >

        <input
          type="text"
          placeholder="Select stocks"
          onFocus={() => setOpen(true)}
          onChange={() => {
            setOpen(true);
          }}
        />

        {open && filtered.length > 0 && (
          <div className = { styling.searchBarDropdownMenu } >
            
            {filtered.map((option) => (
              <div
                key={option}
                className={ styling.searchBarDropdownOption }
                onClick={() => {
                  onSelect?.(option);
                  setOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}