import { useState, useEffect } from "react";

import styling from "./../styles/LiteratureStyling.module.css"


type LiteratureItem = {
  id: number;
  title: string;
  author: string;
  keywords: string;
  views: number;
};

type SearchKeywords = string;

export default function LiteratureResults() {
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
    searchLiteratureItems(""); // or a default query
  }, []);

  return (
    <>
      <div className={ styling.resultsArea }>
        <div>
          <input 
            type="text" 
            placeholder="Search Literature"
            onChange={(e) => searchLiteratureItems(e.target.value) }
          />
        </div>

          <table>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Keywords</th><th>Views</th></tr>
            </thead>
            <tbody>
              {results.map(({ id, title, author, keywords, views }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{author}</td>
                  <td>{keywords}</td>
                  <td>{views}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </>
  )
}
