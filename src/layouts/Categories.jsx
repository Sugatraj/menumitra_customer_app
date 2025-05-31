import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL = "https://men4u.xyz/v2";
const DEFAULT_IMAGE = 'https://as2.ftcdn.net/jpg/02/79/12/03/1000_F_279120368_WzIoR2LV2Cgy33oxy6eEKQYSkaWr8AFU.jpg';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  // Function to check if image URL is valid
  const checkImageUrl = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const authData = localStorage.getItem('auth');
        const userData = authData ? JSON.parse(authData) : null;

        const response = await fetch(`${API_BASE_URL}/user/get_category_list_with_image`, {
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

        // Map categories and validate image URLs
        const mappedCategories = await Promise.all(
          data.detail.menu_list.map(async (category) => {
            const isValidImage = category.image ? await checkImageUrl(category.image) : false;
            
            // If image URL is invalid, mark it as an error immediately
            if (!isValidImage) {
              setImageErrors(prev => ({
                ...prev,
                [category.menu_cat_id]: true
              }));
            }

            return {
              menuCatId: category.menu_cat_id,
              categoryName: category.category_name,
              image: category.image,
              outletId: category.outlet_id,
              outletVegNonveg: category.outlet_veg_nonveg,
              menuCount: category.menu_count
            };
          })
        );

        setCategories(mappedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleImageError = (categoryId) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true
    }));
  };

  // Function to get the correct image URL
  const getImageUrl = (category) => {
    if (!category.image || imageErrors[category.menuCatId]) {
      return DEFAULT_IMAGE;
    }
    return category.image;
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
                    href="product.html"
                    className="categore-box box-lg"
                    style={{
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
                    {/* Hidden image for error handling */}
                    <img 
                      src={category.image}
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
