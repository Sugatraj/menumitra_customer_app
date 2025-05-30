import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Favourite from "./layouts/Favourite";
import SidebarProvider from "./contexts/SidebarContext";
import Sidebar from "./components/Sidebar";
import Checkout from "./layouts/Checkout";

function App() {
  return (
    <>
      <Router>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourite />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Sidebar />
        </SidebarProvider>
      </Router>
    </>
  );
}

export default App;
