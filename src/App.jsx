import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OutletProvider } from "./contexts/OutletContext";
import Home from "./layouts/Home";
import AllOutlets from "./layouts/AllOutlets";
import AuthOffcanvas from "./components/Auth/AuthOffcanvas";
import Favourite from "./layouts/Favourite";
import SidebarProvider from "./contexts/SidebarContext";
import Sidebar from "./components/Sidebar";
import Checkout from "./layouts/Checkout";
import Orders from "./layouts/Orders";
import OrderDetail from "./layouts/OrderDetail";
import Profile from "./layouts/Profile";
import EditProfile from "./layouts/EditProfile";
import Categories from "./layouts/Categories";
import CategoryFilteredMenuList from "./layouts/CategoryFilteredMenuList";
import Search from "./layouts/Search";
import ProductDetail from "./layouts/ProductDetail";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ModalProvider } from "./contexts/ModalContext";
import ModalManager from "./components/Modal/ModalManager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { clearAppData } from "./utils/clearAppData";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeColorProvider } from "./contexts/ThemeColorContext";
import CustomerSavings from "./layouts/CustomerSavings";
const queryClient = new QueryClient();

function App() {
  const [shouldClearCart, setShouldClearCart] = useState(false);

  const handleLogout = useCallback(() => {
    setShouldClearCart(true);
  }, []);

  return (
    <OutletProvider>
      <ThemeColorProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <CartProvider onLogout={handleLogout}>
                <ModalProvider>
                  <AuthOffcanvas />
                  <Router basename={import.meta.env.BASE_URL}>
                    <SidebarProvider>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                          path="/:outletCode/:sectionId/:tableId"
                          element={<Home />}
                        />
                        <Route path="/all-outlets" element={<AllOutlets />} />
                        <Route path="/favourites" element={<Favourite />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route
                          path="/order-detail/:orderId"
                          element={<OrderDetail />}
                        />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route
                          path="/category-menu/:categoryId"
                          element={<CategoryFilteredMenuList />}
                        />
                        <Route path="/search" element={<Search />} />
                        <Route
                          path="/product-detail/:menuId/:menuCatId"
                          element={<ProductDetail />}
                        />
                        <Route path="/savings" element={<CustomerSavings />} />
                      </Routes>
                      <Sidebar />
                    </SidebarProvider>
                  </Router>
                  <ModalManager />
                </ModalProvider>
              </CartProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ThemeColorProvider>
    </OutletProvider>
  );
}

// Add an event listener for storage changes
window.addEventListener("storage", (e) => {
  if (e.key === "auth" && !e.newValue) {
    clearAppData();
  }
});

export default App;
