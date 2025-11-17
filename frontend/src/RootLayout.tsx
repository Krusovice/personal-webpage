// RootLayout.tsx


// Components
import Edges from "./components/Edges"
import MainWindow from "./components/MainWindow"

// Styling
import styles from "./styles/RootWindowStyling.module.css";

export default function RootLayout() {
  return (
      <div className={ styles.rootWindow } >
        <MainWindow />
        <Edges />
      </div>
  );
}

      