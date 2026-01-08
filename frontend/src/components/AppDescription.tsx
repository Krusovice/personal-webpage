import { useState } from "react";
import layoutStyling from "./../styles/LayoutStyling.module.css"
import styling from "./../styles/literature/LiteratureStyling.module.css"
export default function AppDescription() {
  const [docsOpen, setDocsOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  
  return(
    <div className={`${styling.appInfoArea}`}>
      <div className={ styling.appDescArea }>
        <h3>Description</h3>
      </div>
      <div className={ styling.appDocsArea }>
        <h3>Documentation</h3>
      </div>
    </div>
  )
}