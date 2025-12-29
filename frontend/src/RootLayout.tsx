
import Edges from "./components/Edges"
import MainWindow from "./components/MainWindow"

import layoutStyling from "./styles/LayoutStyling.module.css";

export default function RootLayout() {
  return (
      <div className={ layoutStyling.rootWindow } >
        <MainWindow />
        <Edges />
      </div>
  );
}

      