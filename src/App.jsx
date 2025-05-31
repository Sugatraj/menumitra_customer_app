import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import AuthOffcanvas from "./components/Auth/AuthOffcanvas";
import Favourite from "./layouts/Favourite";
import SidebarProvider from "./contexts/SidebarContext";
import Sidebar from "./components/Sidebar";
import Checkout from "./layouts/Checkout";
import Orders from "./layouts/Orders";
import Profile from "./layouts/Profile";
import EditProfile from "./layouts/EditProfile";
import Categories from "./layouts/Categories";
import Search from "./layouts/Search";
import ProductDetail from "./layouts/ProductDetail";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthOffcanvas />
        <Router basename={import.meta.env.BASE_URL}>
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
              <Route path="/product-detail" element={<ProductDetail />} />
            </Routes>
            <Sidebar />
          </SidebarProvider>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
