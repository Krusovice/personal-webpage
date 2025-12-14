import type { StockData, StockOptions } from "./types.ts";

export async function fetchTickerData(ticker: string): Promise<StockData[]> {
  const resp = await fetch("/api/stocks/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ticker }),
  });

  if (!resp.ok) {
    throw new Error(`Request failed: ${resp.status}`);
  }

  return (await resp.json()) as StockData[];
}


export async function fetchStockOptions(): Promise<StockOptions> {
  const resp = await fetch("/api/stocks/fetch_options", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!resp.ok) {
    throw new Error(`Request failed: ${resp.status}`);
  }

  return (await resp.json()) as StockOptions;
}