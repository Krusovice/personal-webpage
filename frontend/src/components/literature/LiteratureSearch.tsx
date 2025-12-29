import React from "react";

type Props = {
  onSearch: (value: string) => void;
};

export function LiteratureSearch({ onSearch }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
      <input
        type="text"
        placeholder="Search Literature"
        onChange={handleChange}
      />
  );
}
