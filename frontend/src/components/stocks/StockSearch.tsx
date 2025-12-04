import { useState, useEffect, useRef } from "react";
import styling from "./../../styles/stocks/StocksStyling.module.css";

type StockSearchProps = {
  options: string[];
  onSelect: (ticker: string) => void;
};

export default function StockSearch({ options, onSelect }: StockSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filtered = options.filter((opt) => 
    opt.toLowerCase().includes(query.toLowerCase())
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
          value={query}
          placeholder="Type in a Stock"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
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