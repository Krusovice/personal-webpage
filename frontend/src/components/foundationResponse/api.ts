import type { FoundationResponseApiInput } from "./types.ts";

export async function foundationResponseApiCall(input: FoundationResponseApiInput): Promise<number> {
  const resp = await fetch("http://localhost:8100/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify( input ),
  });

  if (!resp.ok) {
    throw new Error(`Request failed: ${resp.status}`);
  }

  // The return is just a resulting settlement value
  return (await resp.json()) as number;
}