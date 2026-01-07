import { useState } from "react";

import layoutStyling from "./../../styles/LayoutStyling.module.css"
import styling from "./../../styles/sidebar/ServerMonitor.module.css"


export default function ServerMonitorGraph() {
  const [value, setValue] = useState("");

  return (
    <div className={`${layoutStyling.subWindowDark} ${styling.monitorGraph}` }>
      Server monitor graph component
    </div>
  );
}