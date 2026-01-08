import React from "react";
import styling from "./../../styles/literature/LiteratureStyling.module.css";

type Props = {
  onSearch: (value: string) => void;
};

export function LiteratureSearch({ onSearch }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={ styling.searchBar }>
      <input
        type="text"
        placeholder="Search Literature"
        onChange={handleChange}
      />
    </div>
  );
}
