import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HorizontalMenuCard from "../components/HorizontalMenuCard";
import OffcanvasSearchFilter from "../components/Shared/OffcanvasSearchFilter";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have AuthContext
import { debounce } from 'lodash'; // Make sure to install lodash

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  
  // Get these from context/props
  const outletId = 1; // This should come from your app context/state
  const { userId } = useAuth(); // Get user_id from auth context

  // Search API function
  const searchMenu = async (keyword) => {
    try {
      const response = await fetch('https://men4u.xyz/v2/user/search_menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outlet_id: outletId,
          keyword: keyword || "", // Send empty string if no keyword
          user_id: userId
        })
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data.detail.menu_list;
    } catch (err) {
      throw new Error(err.message || 'Failed to search menu items');
    }
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchMenu(searchTerm);
        setSearchResults(results);
      } catch (err) {
        setError(err.message);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500), // 500ms delay
    [outletId, userId] // Dependencies
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    debouncedSearch(searchTerm);
  };

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleAddToCart = (menu) => {
    // Implement add to cart logic
  };

  const handleFavoriteClick = (menuId) => {
    // Implement favorite toggle logic
  };

  // Add this helper function
  const hasSearchResults = () => {
    return searchResults && searchResults.length > 0;
  };

  // Modify the toggle filter function
  const toggleFilter = () => {
    if (hasSearchResults()) {
      setShowFilter(!showFilter);
    }
  };

  const handleApplyFilter = async (filters) => {
    setIsLoading(true);
    setActiveFilters(filters);

    try {
      const response = await fetch('https://men4u.xyz/v2/user/search_menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outlet_id: outletId,
          user_id: userId,
          filters: {
            price_min: filters.priceRange.min,
            price_max: filters.priceRange.max,
            rating: filters.starRating,
            food_type: getFoodTypeFilter(filters.foodType),
            has_discount: filters.others.discount,
            has_voucher: filters.others.voucher,
            free_shipping: filters.others.freeShipping,
            same_day_delivery: filters.others.sameDayDelivery
          }
        })
      });

      if (!response.ok) {
        throw new Error('Filter application failed');
      }

      const data = await response.json();
      
      let filteredResults = data.detail.menu_list;
      if (filters.foodType.veg || filters.foodType.nonveg) {
        filteredResults = filteredResults.filter(menu => {
          if (filters.foodType.veg && !filters.foodType.nonveg) {
            return menu.menu_food_type === 'veg';
          }
          if (!filters.foodType.veg && filters.foodType.nonveg) {
            return menu.menu_food_type === 'nonveg';
          }
          return true;
        });
      }
      
      setSearchResults(filteredResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFoodTypeFilter = (foodType) => {
    if (foodType.veg && !foodType.nonveg) return 'veg';
    if (!foodType.veg && foodType.nonveg) return 'nonveg';
    return 'all';
  };

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="serach-area">
            <div className="d-flex align-items-center mb-4">
              <div className="w-100">
                <div className="mb-0 input-group input-group-icon">
                  <div className="input-group-text">
                    <div className="input-icon search-icon">
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
                    </div>
                  </div>
                  <input
                    type="search"
                    className="form-control main-in px-0 bs-0"
                    placeholder="Search menu items..."
                    onChange={handleSearchChange}
                  />
                  <span className="input-group-text">
                    <a
                      href="javascript:void(0);"
                      className={`input-icon search-icon ${!hasSearchResults() ? 'disabled' : ''}`}
                      onClick={hasSearchResults() ? toggleFilter : undefined}
                      style={{
                        opacity: hasSearchResults() ? 1 : 0.5,
                        cursor: hasSearchResults() ? 'pointer' : 'not-allowed'
                      }}
                      title={hasSearchResults() ? 'Filter results' : 'Search for items to enable filtering'}
                    >
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0212 3H3.97868C3.57142 3.00032 3.17301 3.11885 2.8318 3.34119C2.49059 3.56353 2.22125 3.88013 2.05647 4.25257C1.89169 4.62501 1.83856 5.03727 1.90352 5.43931C1.96848 5.84136 2.14875 6.21591 2.42243 6.5175L9.37493 14.1638V21.375C9.37499 21.516 9.41478 21.6541 9.48973 21.7734C9.56468 21.8928 9.67175 21.9887 9.79868 22.05C9.90012 22.1 10.0118 22.1257 10.1249 22.125C10.2954 22.1249 10.4607 22.0667 10.5937 21.96L11.9999 20.835L14.3437 18.96C14.4314 18.8898 14.5022 18.8008 14.5509 18.6995C14.5996 18.5982 14.6249 18.4874 14.6249 18.375V14.1638L21.5774 6.5175C21.8511 6.21591 22.0314 5.84136 22.0963 5.43931C22.1613 5.03727 22.1082 4.62501 21.9434 4.25257C21.7786 3.88013 21.5093 3.56353 21.1681 3.34119C20.8269 3.11885 20.4284 3.00032 20.0212 3V3Z"
                          fill="#7D8FAB"
                        />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="title-bar mt-0">
              <span className="title mb-0 font-18">Recent Search</span>
              <a
                className="font-14 font-w500 text-accent all-close"
                href="javascript:void(0);"
              >
                Clear All
              </a>
            </div>
            <ul className="recent-search-list">
              <li>
                <div className="d-flex align-items-center">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11C21.7348 11 21.4804 11.1054 21.2929 11.2929C21.1053 11.4804 21 11.7348 21 12C21.0041 14.046 20.3124 16.0325 19.0384 17.6334C17.7645 19.2344 15.984 20.3545 13.9894 20.8099C11.9948 21.2654 9.90455 21.029 8.062 20.1397C6.21945 19.2503 4.73407 17.7608 3.8498 15.9159C2.96552 14.0709 2.7349 11.98 3.19581 9.98665C3.65672 7.99328 4.78176 6.21589 6.38618 4.94634C7.99061 3.67679 9.97905 2.99055 12.025 3.00031C14.0709 3.01006 16.0527 3.71523 17.645 5.00002H16C15.7348 5.00002 15.4804 5.10537 15.2929 5.29291C15.1053 5.48044 15 5.7348 15 6.00002C15 6.26523 15.1053 6.51959 15.2929 6.70712C15.4804 6.89466 15.7348 7.00002 16 7.00002H20C20.2652 7.00002 20.5195 6.89466 20.7071 6.70712C20.8946 6.51959 21 6.26523 21 6.00002V2.00002C21 1.7348 20.8946 1.48044 20.7071 1.29291C20.5195 1.10537 20.2652 1.00002 20 1.00002C19.7348 1.00002 19.4804 1.10537 19.2929 1.29291C19.1053 1.48044 19 1.7348 19 2.00002V3.53102C17.0727 1.94258 14.6617 1.05806 12.1644 1.02319C9.66714 0.988309 7.23246 1.80516 5.26153 3.33915C3.2906 4.87314 1.901 7.03275 1.32169 9.46217C0.742374 11.8916 1.00791 14.4459 2.07453 16.7042C3.14116 18.9625 4.94525 20.7901 7.18956 21.8859C9.43387 22.9817 11.9845 23.2803 14.4212 22.7325C16.858 22.1847 19.0354 20.8232 20.5948 18.8723C22.1542 16.9214 23.0025 14.4976 23 12C23 11.7348 22.8946 11.4804 22.7071 11.2929C22.5195 11.1054 22.2652 11 22 11Z"
                      fill="#7D8FAB"
                    />
                    <path
                      d="M12 5.00002C11.7348 5.00002 11.4804 5.10537 11.2929 5.29291C11.1054 5.48045 11 5.7348 11 6.00002V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8803 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V6.00002C13 5.7348 12.8946 5.48045 12.7071 5.29291C12.5196 5.10537 12.2652 5.00002 12 5.00002Z"
                      fill="#7D8FAB"
                    />
                  </svg>
                  <h5 className="sub-title ms-2 mb-0">Tomatoes</h5>
                </div>
                <a href="javascript:void(0);" className="close-1 remove-tag">
                  <i className="fa-solid fa-xmark cross" />
                </a>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11C21.7348 11 21.4804 11.1054 21.2929 11.2929C21.1053 11.4804 21 11.7348 21 12C21.0041 14.046 20.3124 16.0325 19.0384 17.6334C17.7645 19.2344 15.984 20.3545 13.9894 20.8099C11.9948 21.2654 9.90455 21.029 8.062 20.1397C6.21945 19.2503 4.73407 17.7608 3.8498 15.9159C2.96552 14.0709 2.7349 11.98 3.19581 9.98665C3.65672 7.99328 4.78176 6.21589 6.38618 4.94634C7.99061 3.67679 9.97905 2.99055 12.025 3.00031C14.0709 3.01006 16.0527 3.71523 17.645 5.00002H16C15.7348 5.00002 15.4804 5.10537 15.2929 5.29291C15.1053 5.48044 15 5.7348 15 6.00002C15 6.26523 15.1053 6.51959 15.2929 6.70712C15.4804 6.89466 15.7348 7.00002 16 7.00002H20C20.2652 7.00002 20.5195 6.89466 20.7071 6.70712C20.8946 6.51959 21 6.26523 21 6.00002V2.00002C21 1.7348 20.8946 1.48044 20.7071 1.29291C20.5195 1.10537 20.2652 1.00002 20 1.00002C19.7348 1.00002 19.4804 1.10537 19.2929 1.29291C19.1053 1.48044 19 1.7348 19 2.00002V3.53102C17.0727 1.94258 14.6617 1.05806 12.1644 1.02319C9.66714 0.988309 7.23246 1.80516 5.26153 3.33915C3.2906 4.87314 1.901 7.03275 1.32169 9.46217C0.742374 11.8916 1.00791 14.4459 2.07453 16.7042C3.14116 18.9625 4.94525 20.7901 7.18956 21.8859C9.43387 22.9817 11.9845 23.2803 14.4212 22.7325C16.858 22.1847 19.0354 20.8232 20.5948 18.8723C22.1542 16.9214 23.0025 14.4976 23 12C23 11.7348 22.8946 11.4804 22.7071 11.2929C22.5195 11.1054 22.2652 11 22 11Z"
                      fill="#7D8FAB"
                    />
                    <path
                      d="M12 5.00002C11.7348 5.00002 11.4804 5.10537 11.2929 5.29291C11.1054 5.48045 11 5.7348 11 6.00002V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8803 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V6.00002C13 5.7348 12.8946 5.48045 12.7071 5.29291C12.5196 5.10537 12.2652 5.00002 12 5.00002Z"
                      fill="#7D8FAB"
                    />
                  </svg>
                  <h5 className="sub-title ms-2 mb-0">Local Fresh Spinach</h5>
                </div>
                <a href="javascript:void(0);" className="close-1 remove-tag">
                  <i className="fa-solid fa-xmark" />
                </a>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11C21.7348 11 21.4804 11.1054 21.2929 11.2929C21.1053 11.4804 21 11.7348 21 12C21.0041 14.046 20.3124 16.0325 19.0384 17.6334C17.7645 19.2344 15.984 20.3545 13.9894 20.8099C11.9948 21.2654 9.90455 21.029 8.062 20.1397C6.21945 19.2503 4.73407 17.7608 3.8498 15.9159C2.96552 14.0709 2.7349 11.98 3.19581 9.98665C3.65672 7.99328 4.78176 6.21589 6.38618 4.94634C7.99061 3.67679 9.97905 2.99055 12.025 3.00031C14.0709 3.01006 16.0527 3.71523 17.645 5.00002H16C15.7348 5.00002 15.4804 5.10537 15.2929 5.29291C15.1053 5.48044 15 5.7348 15 6.00002C15 6.26523 15.1053 6.51959 15.2929 6.70712C15.4804 6.89466 15.7348 7.00002 16 7.00002H20C20.2652 7.00002 20.5195 6.89466 20.7071 6.70712C20.8946 6.51959 21 6.26523 21 6.00002V2.00002C21 1.7348 20.8946 1.48044 20.7071 1.29291C20.5195 1.10537 20.2652 1.00002 20 1.00002C19.7348 1.00002 19.4804 1.10537 19.2929 1.29291C19.1053 1.48044 19 1.7348 19 2.00002V3.53102C17.0727 1.94258 14.6617 1.05806 12.1644 1.02319C9.66714 0.988309 7.23246 1.80516 5.26153 3.33915C3.2906 4.87314 1.901 7.03275 1.32169 9.46217C0.742374 11.8916 1.00791 14.4459 2.07453 16.7042C3.14116 18.9625 4.94525 20.7901 7.18956 21.8859C9.43387 22.9817 11.9845 23.2803 14.4212 22.7325C16.858 22.1847 19.0354 20.8232 20.5948 18.8723C22.1542 16.9214 23.0025 14.4976 23 12C23 11.7348 22.8946 11.4804 22.7071 11.2929C22.5195 11.1054 22.2652 11 22 11Z"
                      fill="#7D8FAB"
                    />
                    <path
                      d="M12 5.00002C11.7348 5.00002 11.4804 5.10537 11.2929 5.29291C11.1054 5.48045 11 5.7348 11 6.00002V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8803 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V6.00002C13 5.7348 12.8946 5.48045 12.7071 5.29291C12.5196 5.10537 12.2652 5.00002 12 5.00002Z"
                      fill="#7D8FAB"
                    />
                  </svg>
                  <h5 className="sub-title ms-2 mb-0">Fresh Orange</h5>
                </div>
                <a href="javascript:void(0);" className="close-1 remove-tag">
                  <i className="fa-solid fa-xmark" />
                </a>
              </li>
            </ul>
            {/* Product List */}
            <div className="item-list style-2">
              <div className="saprater" />
              <div className="title-bar">
                <span className="title mb-0 font-18">Search Results</span>
                <select
                  className="form-select dz-form-select style-2"
                  aria-label="Default select example"
                >
                  <option selected="">Newest</option>
                  <option value={1}>One</option>
                  <option value={2}>Three</option>
                </select>
              </div>
              <ul>
                {searchResults.map((menu) => (
                  <li key={menu.menu_id}>
                    <HorizontalMenuCard
                      image={menu.image}
                      title={menu.menu_name}
                      currentPrice={menu.portions[0].price}
                      originalPrice={menu.offer ? (menu.portions[0].price * 100) / (100 - menu.offer) : null}
                      discount={menu.offer ? `${menu.offer}%` : null}
                      onAddToCart={() => handleAddToCart(menu)}
                      onFavoriteClick={() => handleFavoriteClick(menu.menu_id)}
                      isFavorite={menu.is_favourite === 1}
                      productUrl={`/product-detail/${menu.menu_id}`}
                      rating={menu.rating}
                      foodType={menu.menu_food_type}
                      categoryName={menu.category_name}
                      portions={menu.portions}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {/* Product List */}
          </div>
        </div>
      </div>

      {/* Only render the offcanvas if there are search results */}
      {hasSearchResults() && (
        <div 
          className={`offcanvas offcanvas-start be-0 ${showFilter ? 'show' : ''}`} 
          tabIndex="-1" 
          id="offcanvasLeft" 
          aria-modal="true" 
          role="dialog"
        >
          <OffcanvasSearchFilter 
            onClose={() => setShowFilter(false)} 
            onApplyFilter={handleApplyFilter}
          />
        </div>
      )}

      {/* Loading and Error states */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Footer />
    </>
  );
}

// Add some CSS to your stylesheet
const styles = `
  .input-icon.search-icon.disabled {
    pointer-events: none;
  }
`;

export default Search;
