// App.tsx
import Frontpage from "./pages/Frontpage";
import stylesRootWindow from "./styles/RootWindowStyling.module.css";

export default function App() {
  return (
    <div className={ stylesRootWindow.rootWindow } >
      <Frontpage />
    </div>
    
  );
}
