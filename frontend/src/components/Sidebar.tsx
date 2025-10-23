import CalculatorInput from "./Calculator.tsx"

import stylesSidebar from "./../styles/SidebarStyling.module.css"

export default function Sidebar() {
  return (
    <div className={ stylesSidebar.sidebar }>
      <CalculatorInput/>
    </div> 
  )
}
