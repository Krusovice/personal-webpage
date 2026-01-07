import { useState } from "react";
import ServerMonitorGraph from "./ServerMonitorGraph.tsx"

import layoutStyling from "./../../../styles/LayoutStyling.module.css"
import styling from "./../../../styles/sidebar/ServerMonitor.module.css"


export default function ServerMonitor() {
  const [value, setValue] = useState("");

  return (
    <div className={`${layoutStyling.subWindowDark} ${styling.monitorGraph}` }>
      <h5>Live server use monitoring</h5>
      <ServerMonitorGraph/>

    </div>
  );
}