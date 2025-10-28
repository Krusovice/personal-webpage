import { useState } from "react";

import styling from "./../styles/LiteratureStyling.module.css"

/*
1. Define search results list as state
2. Create function that fetches from the literature database, based on search.
3. Create input area. Run fetch function on change.
4. Create result area.
*/

type LiteratureItem = {
  id: number;
  title: string;
  author: string;
  keywords: string;
};


export default function LiteratureResults() {
  const [results, setResults] = useState<any[]>([]);

  function searchAllLiteratureItems() {
    fetch("http://127.0.0.1:5000/get_all_literature_items", {
      method: "GET",
      headers: { Accept: "application/json" }, // no Content-Type for GET
    })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setResults)
      .catch(err => console.error("Fetch error:", err));
  }


  return (
    <>
      <div className={ styling.resultsArea }>
        <div>
          <input 
            type="text" 
            placeholder="Search Literature"
            onChange={() => searchAllLiteratureItems() }
          />
        </div>

        {<pre>{JSON.stringify(results, null, 2)}</pre>}
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