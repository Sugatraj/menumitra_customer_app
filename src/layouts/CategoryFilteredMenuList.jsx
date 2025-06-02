import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerticalMenuCard from '../components/VerticalMenuCard';

const API_BASE_URL = "https://men4u.xyz/v2";
const DEFAULT_IMAGE = 'https://as2.ftcdn.net/jpg/02/79/12/03/1000_F_279120368_WzIoR2LV2Cgy33oxy6eEKQYSkaWr8AFU.jpg';

function CategoryFilteredMenuList() {
  const { categoryId } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const menuCount = location.state?.menuCount;

  const [categoryData, setCategoryData] = useState({
    category: null,
    menus: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenusByCategory = async () => {
      try {
        const authData = localStorage.getItem('auth');
        const userData = authData ? JSON.parse(authData) : null;

        const response = await fetch(`${API_BASE_URL}/user/get_all_menu_list_by_category`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData?.accessToken}`
          },
          body: JSON.stringify({
            outlet_id: 1
          })
        });

        const data = await response.json();
        
        if (data.detail) {
          const filteredMenus = data.detail.menus.filter(
            menu => menu.menu_cat_id.toString() === categoryId
          );

          setCategoryData({
            category: {
              menu_cat_id: categoryId,
              category_name: categoryName || data.detail.category.find(cat => 
                cat.menu_cat_id.toString() === categoryId
              )?.category_name,
              menu_count: menuCount
            },
            menus: filteredMenus
          });
        }
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError('Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchMenusByCategory();
    }
  }, [categoryId, categoryName, menuCount]);

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
        <div className="container">
          {categoryData.category && (
            <div className="category-header mb-4">
              <h4 className="title mb-1">{categoryData.category.category_name}</h4>
              {categoryData.category.menu_count && (
                <small className="text-muted">
                  {categoryData.category.menu_count} Items Available
                </small>
              )}
            </div>
          )}
          
          <div className="row g-3">
            {categoryData.menus.map((menu) => (
              <div key={menu.menu_id} className="col-12">
                <VerticalMenuCard
                  menuItem={{
                    menuId: menu.menu_id,
                    menuName: menu.menu_name,
                    menuFoodType: menu.menu_food_type,
                    categoryName: menu.category_name,
                    spicyIndex: menu.spicy_index,
                    portions: menu.portions,
                    rating: menu.rating,
                    offer: menu.offer,
                    isSpecial: menu.is_special,
                    isFavourite: menu.is_favourite,
                    isActive: menu.is_active,
                    image: menu.image || DEFAULT_IMAGE
                  }}
                />
              </div>
            ))}
            
            {categoryData.menus.length === 0 && (
              <div className="col-12">
                <div className="alert alert-info">
                  No menu items found in this category.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryFilteredMenuList;