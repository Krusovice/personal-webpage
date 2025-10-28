//import { useState } from "react";

import styling from "./../styles/LiteratureStyling.module.css"

export default function LiteratureResults() {

  return (
    <div className={ styling.resultsArea }>
      
    </div>
  )
}

/*
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