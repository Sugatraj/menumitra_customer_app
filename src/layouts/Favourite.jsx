import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerticalMenuCard from "../components/VerticalMenuCard";
import { useAuth } from '../contexts/AuthContext';
import { useFavorite } from '../hooks/api/useFavorite';

const API_BASE_URL = 'https://men4u.xyz/v2';
const DEFAULT_IMAGE = 'https://as2.ftcdn.net/jpg/02/79/12/03/1000_F_279120368_WzIoR2LV2Cgy33oxy6eEKQYSkaWr8AFU.jpg';

function Favourite() {
  const navigate = useNavigate();
  const [favoriteMenus, setFavoriteMenus] = useState([]);
  const { getFavorites, toggleFavorite, loading, error } = useFavorite();
  const { user } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavoriteMenus(favorites);
      } catch (err) {
        // Error handling is managed by the hook
      }
    };

    loadFavorites();
  }, []);

  const navigateToMenus = () => {
    navigate('/');
  };

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

  const handleFavoriteToggle = async (menuId) => {
    try {
      await toggleFavorite(menuId, true);
      // Refresh the favorites list
      const updatedFavorites = await getFavorites();
      setFavoriteMenus(updatedFavorites);
    } catch (err) {
      // Error handling is managed by the hook
    }
  };

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
              {/* <div className="title-bar">
                <span className="title mb-0 font-18">Favorite Items</span>
              </div> */}
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
                        onFavoriteToggle={() => handleFavoriteToggle(menu.menu_id)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
                      <div className="text-center">
                        <div className="mb-4">
                          <svg 
                            width="80" 
                            height="80" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            style={{ opacity: '0.5' }}
                            className="text-muted"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </div>
                        <h5 className="mb-3">No Favourite Menus</h5>
                        <p className="text-muted mb-4">You haven't added any menus to your favorites yet</p>
                        <button 
                          className="btn btn-primary" 
                          onClick={navigateToMenus}
                        >
                          See Menus
                        </button>
                      </div>
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
