// App.tsx
import Mainpage from "./pages/Mainpage";
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import Edges from "./components/Edges"
import stylesRootWindow from "./styles/RootWindowStyling.module.css";

import "./constants/colors.css";

export default function App() {
  return (
    <div className={ stylesRootWindow.rootWindow } >
      <Topbar />
      <Sidebar />
      <Mainpage />
      <Edges />
    </div>
    
  );
}
