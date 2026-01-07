import { Outlet } from "react-router-dom";

import Topbar from "./Topbar"
import Sidebar from "./sidebar/Sidebar"

import styles from "./../styles/LayoutStyling.module.css";

export default function RootLayout() {
  return(
    <div className = {styles.mainWindow}>
      <main>
        {/* Routed pages render here */}
        <Outlet />
      </main>
      <Topbar />
      <Sidebar />
    </div>
  )
}