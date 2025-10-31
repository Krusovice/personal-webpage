import { useState, useEffect } from "react";

import styling from "./../styles/LiteratureStyling.module.css"


type LiteratureItem = {
  id: number;
  title: string;
  author: string;
  keywords: string;
};

type SearchKeywords = string;

export default function LiteratureResults() {
  const [results, setResults] = useState<LiteratureItem[]>([]);

  async function searchLiteratureItems(searchKeywords: SearchKeywords) {
    const resp = await fetch("http://127.0.0.1:5000/search_literature_items", {
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
              {results.map(({ id, title, author, keywords }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{author}</td>
                  <td>{keywords}</td>
                  <td>int</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </>
  )
}

/*
        <table>
          <caption>Team members</caption>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Age</th></tr>
          </thead>
          <tbody>
            <tr><td>Alice</td><td>alice@example.com</td><td>28</td></tr>
            <tr><td>Bob</td><td>bob@example.com</td><td>34</td></tr>
          </tbody>
        </table>



export default function UsersSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // simple debounce
  const debouncedQ = useMemo(() => q, [q]);
  useEffect(() => {
    if (!debouncedQ) { setResults([]); return; }

    const ctrl = new AbortController();
    setLoading(true); setError(null);

    fetch("http://localhost:3001/api/users/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term: debouncedQ, limit: 10 }),
      signal: ctrl.signal,
    })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(setResults)
      .catch(e => { if (e.name !== "AbortError") setError(String(e)); })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [debouncedQ]);

  return (
    <div>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search users…"
      />
      {loading && <p>Loading…</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      <ul>
        {results.map(u => <li key={u.id}>{u.name} — {u.email}</li>)}
      </ul>
    </div>
  );
}
*/