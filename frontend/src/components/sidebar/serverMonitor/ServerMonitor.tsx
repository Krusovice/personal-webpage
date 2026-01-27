import { useState } from "react";

import ServerMonitorGraph from "./ServerMonitorGraph.tsx"

import layoutStyling from "./../../../styles/LayoutStyling.module.css"
import styling from "./../../../styles/sidebar/ServerMonitor.module.css"


export default function ServerMonitor() {
  const [zoomed, setZoomed] = useState(false);


  return (
    <div 
      className={`${layoutStyling.subWindowDark} ${styling.monitorGraph} ${zoomed ? styling.zoomed : styling.unzoomed}`}
      onClick={() => setZoomed(prev => !prev)}
    >

      <ServerMonitorGraph/>
    </div>
  );
}
