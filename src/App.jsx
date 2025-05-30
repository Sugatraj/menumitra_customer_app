import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Favourite from "./layouts/Favourite";
import SidebarProvider from "./contexts/SidebarContext";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Router>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourite />} />
          </Routes>
          <Sidebar />
        </SidebarProvider>
      </Router>
    </>
  );
}

export default App;
