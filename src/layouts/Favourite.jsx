import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerticalMenuCard from "../components/VerticalMenuCard";
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'https://men4u.xyz/v2';
const DEFAULT_IMAGE = 'https://as2.ftcdn.net/jpg/02/79/12/03/1000_F_279120368_WzIoR2LV2Cgy33oxy6eEKQYSkaWr8AFU.jpg';

function Favourite() {
  const [favoriteMenus, setFavoriteMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const authData = localStorage.getItem('auth');
        const userData = authData ? JSON.parse(authData) : null;

        if (!userData?.accessToken) {
          setError('Please login to view favorites');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/user/get_favourite_list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`
          },
          body: JSON.stringify({
            outlet_id: 1,
            user_id: userData.userId
          })
        });

        const data = await response.json();

        if (data.detail && data.detail.lists) {
          // Flatten the nested structure into a single array of menu items
          const allMenus = Object.values(data.detail.lists).flat();
          setFavoriteMenus(allMenus);
        } else {
          setFavoriteMenus([]);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorite items');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="container">
            <div className="text-center p-5">Loading...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="container">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="content-inner pt-0">
          <div className="container p-b20">
            {/* Search */}
            <div>
              <div className="mb-3 input-group input-radius">
                <span className="input-group-text">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z"
                      fill="#7D8FAB"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search here!"
                  className="form-control main-in ps-0 bs-0"
                />
              </div>
            </div>
            <div className="dashboard-area">
              <div className="title-bar">
                <span className="title mb-0 font-18">Favorite Items</span>
              </div>
              <div className="row g-3 mb-3">
                {favoriteMenus.length > 0 ? (
                  favoriteMenus.map((menu) => (
                    <div className="col-6" key={menu.menu_id}>
                      <VerticalMenuCard
                        image={menu.image || DEFAULT_IMAGE}
                        title={menu.menu_name}
                        currentPrice={menu.portions?.[0]?.price || 0}
                        reviewCount={menu.rating ? parseInt(menu.rating) : null}
                        isFavorite={true}
                        discount={menu.offer > 0 ? `${menu.offer}%` : null}
                        menuItem={{
                          menuId: menu.menu_id,
                          menuCatId: menu.menu_cat_id,
                          menuName: menu.menu_name,
                          menuFoodType: menu.menu_food_type,
                          categoryName: menu.category_name,
                          spicyIndex: menu.spicy_index,
                          portions: menu.portions,
                          rating: menu.rating,
                          offer: menu.offer,
                          isSpecial: menu.is_special,
                          isFavourite: true,
                          isActive: true,
                          image: menu.image || DEFAULT_IMAGE
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info text-center">
                      No favorite items found
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Favourite;
