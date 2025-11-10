import { Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Stockspage from "./pages/Stockspage";
import Literaturepage from "./pages/Literaturepage";
import Foundationpage from "./pages/Foundationpage";
import Profilepage from "./pages/Profilepage";
import Registerpage from "./pages/Registerpage";


// Constants
import "./constants/colors.css";

// Other
import RootLayout from "./RootLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Homepage />} />
        <Route path="literature" element={<Literaturepage />} />
        <Route path="stocks" element={<Stockspage />} />
        <Route path="foundation" element={<Foundationpage />} />
        <Route path="profile" element={<Profilepage />} />
        <Route path="register" element={<Registerpage />} />
      </Route>
    </Routes>
  );
}
