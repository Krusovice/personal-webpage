import { useState, useEffect } from "react";
import styling from "./../../styles/LiteratureStyling.module.css";
import type { LiteratureItem, SearchKeywords } from "./types";
import { LiteratureSearch } from "./LiteratureSearch";
import { LiteratureResults } from "./LiteratureResults";

export default function LiteratureContent() {
  const [results, setResults] = useState<LiteratureItem[]>([]);

  async function searchLiteratureItems(searchKeywords: SearchKeywords) {
    const resp = await fetch("/api/search_literature_items", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ searchKeywords }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = (await resp.json()) as LiteratureItem[]; // <-- typed parse
    setResults(data);
  }

  // Run once when the component mounts
  useEffect(() => {
    searchLiteratureItems("");
  }, []);

  return (
    <>
      <div>
        <LiteratureSearch onSearch={searchLiteratureItems} />
      </div>

      <div className={styling.resultsArea}>
        <LiteratureResults items={results} />
      </div>
    </>
  );
}
