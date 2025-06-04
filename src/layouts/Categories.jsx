import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useOutlet } from '../contexts/OutletContext';

const API_BASE_URL = "https://men4u.xyz/v2";
const DEFAULT_IMAGE = 'https://as2.ftcdn.net/jpg/02/79/12/03/1000_F_279120368_WzIoR2LV2Cgy33oxy6eEKQYSkaWr8AFU.jpg';

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const { outletId } = useOutlet();
  useEffect(() => {
    const fetchCategories = async () => {
      console.log('🔄 Fetching categories...');
      try {
        const authData = localStorage.getItem('auth');
        const userData = authData ? JSON.parse(authData) : null;

        // Hardcoded outlet ID for outlet code 9001
        
        console.log('📦 Using outlet ID:', outletId);

        const response = await fetch(`${API_BASE_URL}/user/get_category_list_with_image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData?.accessToken}`
          },
          body: JSON.stringify({
            outlet_id: outletId
          })
        });

        const data = await response.json();
        console.log('✅ API Response:', data);

        // Map categories without image validation
        const mappedCategories = data.detail.menu_list.map(category => ({
          menuCatId: category.menu_cat_id,
          categoryName: category.category_name,
          image: category.image,
          outletId: category.outlet_id,
          outletVegNonveg: category.outlet_veg_nonveg,
          menuCount: category.menu_count
        }));

        console.log('✨ Formatted categories:', mappedCategories);
        setCategories(mappedCategories);
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []); // Removed outletId dependency

  const handleImageError = (categoryId) => {
    console.log('🖼️ Image error for category:', categoryId);
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true
    }));
  };

  const getImageUrl = (category) => {
    return imageErrors[category.menuCatId] ? DEFAULT_IMAGE : (category.image || DEFAULT_IMAGE);
  };

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    console.log('🔍 Navigating to category:', category);
    navigate(`/category-menu/${category.menuCatId}`, { 
      state: { 
        categoryName: category.categoryName,
        menuCount: category.menuCount 
      } 
    });
  };

  return (
    <div>
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="dz-list style-2">
            <ul className="categore-list">
              {categories.map((category) => (
                <li key={category.menuCatId}>
                  <a
                    href="#"
                    onClick={(e) => handleCategoryClick(e, category)}
                    className="categore-box box-lg"
                    style={{
                      cursor: 'pointer',
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${getImageUrl(category)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: '0.3s',
                      position: 'relative',
                      padding: '25px 15px',
                    }}
                  >
                    <img 
                      src={category.image || DEFAULT_IMAGE}
                      alt=""
                      style={{ display: 'none' }}
                      onError={() => handleImageError(category.menuCatId)}
                    />
                    
                    <h6 
                      className="text-white mb-0"
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.2',
                        color: '#FFFFFF',
                        fontWeight: '600',
                        margin: '0 0 4px 0',
                        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {category.categoryName}
                    </h6>
                    <span 
                      className="text-white"
                      style={{
                        fontSize: '12px',
                        lineHeight: '1.2',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '400',
                        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {category.menuCount} Items
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
