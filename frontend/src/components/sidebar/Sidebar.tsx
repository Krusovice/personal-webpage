import CalculatorInput from "./Calculator.tsx"
import ServerMonitorGraph from "./ServerMonitor.tsx"


import stylesSidebar from "./../../styles/sidebar/SidebarStyling.module.css"

export default function Sidebar() {
  return (
    <div className={ stylesSidebar.sidebar }>
      <CalculatorInput/>
      <ServerMonitorGraph/>
    </div>
  )
}
