import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OutletProvider, useOutlet } from "./contexts/OutletContext";
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
import { useState, useCallback, useEffect } from "react";
import { clearAppData } from "./utils/clearAppData";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeColorProvider } from "./contexts/ThemeColorContext";
import CustomerSavings from "./layouts/CustomerSavings";
import OutletDetails from "./layouts/OutletDetails";
import axios from "axios";

const queryClient = new QueryClient();

function App() {
  const [shouldClearCart, setShouldClearCart] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  const handleLogout = useCallback(() => {
    setShouldClearCart(true);
  }, []);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      // Check if we already have outlet_id in localStorage
      const storedOutlet = localStorage.getItem('selectedOutlet');
      const parsedStoredOutlet = storedOutlet ? JSON.parse(storedOutlet) : null;
      
      // Only fetch if we don't have an outlet_id
      if (!parsedStoredOutlet?.outletId) {
        try {
          const response = await axios.post(
            "https://men4u.xyz/v2/user/get_restaurant_details_by_code",
            {
              outlet_code: "9001"
            }
          );
          
          const outletDetails = response.data.data.outlet_details;
          setRestaurantDetails(outletDetails);
          
          // Store complete outlet info in localStorage
          const outletInfo = {
            outletId: outletDetails.outlet_id,
            outletCode: "9001",
            outletName: outletDetails.name,
            isOpen: outletDetails.is_open,
            mobile: outletDetails.mobile,
            fssaiNumber: outletDetails.fssainumber,
            gstNumber: outletDetails.gstnumber,
            address: outletDetails.address,
            ownerId: outletDetails.owner_id,
            outletType: outletDetails.outlet_type,
            outletVegNonveg: outletDetails.outlet_veg_nonveg,
            whatsapp: outletDetails.whatsapp,
            facebook: outletDetails.facebook,
            instagram: outletDetails.instagram,
            website: outletDetails.website,
            googleReview: outletDetails.google_review,
            googleBusinessLink: outletDetails.google_business_link,
            sectionName: outletDetails.section_name
          };
          
          localStorage.setItem('selectedOutlet', JSON.stringify(outletInfo));
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
        }
      }
    };

    fetchRestaurantDetails();
  }, []); // Empty dependency array as we only want this to run once

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
                        <Route path="/outlet-details" element={<OutletDetails />} />
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
