import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Favourite from "./layouts/Favourite";
import SidebarProvider from "./contexts/SidebarContext";
import Sidebar from "./components/Sidebar";
import Checkout from "./layouts/Checkout";
import Orders from "./layouts/Orders";
import Profile from "./layouts/Profile";
import EditProfile from "./layouts/EditProfile";
import Categories from "./layouts/Categories";
import Search from "./layouts/Search";

function App() {
  return (
    <>
      <Router>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourite />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Sidebar />
        </SidebarProvider>
      </Router>
    </>
  );
}

export default App;
