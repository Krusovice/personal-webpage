import { useState, useEffect } from "react";
import styling from "./../../styles/literature/LiteratureStyling.module.css";
import layoutStyling from "./../../styles/LayoutStyling.module.css"
import type { LiteratureItem, SearchKeywords } from "./types";
import { LiteratureSearch } from "./LiteratureSearch";
import { LiteratureResults } from "./LiteratureResults";
import * as Dialog from "@radix-ui/react-dialog";
import { UploadDialog } from "./UploadDialog";
import { useAuth } from "../../auth";


export default function LiteratureApp() {
  const [results, setResults] = useState<LiteratureItem[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const { user } = useAuth();

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
    <div className={styling.literatureApp}>
      <div className={styling.inputArea}>
        <LiteratureSearch onSearch={searchLiteratureItems} />
      

        <div className={styling.uploadArea}>
          <Dialog.Root open={uploadOpen} onOpenChange={setUploadOpen}>
            <Dialog.Trigger asChild>
              {user ? <button type="button">Upload</button> : <button disabled type="button">Upload</button>}
              
            </Dialog.Trigger>

            <UploadDialog
              onUploaded={() => {
                setUploadOpen(false);
                searchLiteratureItems(""); // or keep current filters if you have them
              }}
            />
          </Dialog.Root>
        </div>
      </div>

      <div className={`${styling.resultArea}`}>
        <LiteratureResults items={results} />
      </div>
    </div>
  );
}
