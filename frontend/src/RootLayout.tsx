// RootLayout.tsx
import { Outlet } from "react-router-dom";

// Components
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import Edges from "./components/Edges"

// Styling
import stylesRootWindow from "./styles/RootWindowStyling.module.css";
import stylesMainArea from "./styles/MainAreaStyling.module.css";

export default function RootLayout() {
  return (
      <div className={ stylesRootWindow.rootWindow } >
        <Topbar />
        <Sidebar />
        <main>
          {/* Routed pages render here */}
          <Outlet />
        </main>
        <Edges />
      </div>
  );
}

      