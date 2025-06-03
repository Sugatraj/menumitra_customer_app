import { useState, useEffect } from 'react';
import { useOutlet } from '../contexts/OutletContext';

const API_BASE_URL = 'https://men4u.xyz/v2';
const CACHE_KEY = 'menuItems_cache';
const CACHE_EXPIRY = 1000 * 60 * 5; // 5 minutes

export const useMenuItems = () => {
  const { outletId } = useOutlet(); // Get outletId from context
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update cache key to include outletId
  const getCacheKey = () => `${CACHE_KEY}_${outletId}`;

  // Get cached data function
  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(getCacheKey());
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(getCacheKey());
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  };

  // Set cache data function
  const setCacheData = (data) => {
    try {
      localStorage.setItem(
        getCacheKey(),
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  };

  // Fetch data function
  const fetchMenusByCategory = async () => {
    if (!outletId) return; // Don't fetch if no outletId

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
          outlet_id: outletId, // Use outletId from context
          user_id: userData?.userId || null
        })
      });

      const data = await response.json();

      if (data.detail) {
        // Update categories
        const categories = data.detail.category?.map(category => ({
          menuCatId: category.menu_cat_id,
          categoryName: category.category_name,
          menuCount: category.menu_count
        })) || [];

        // Update menu items
        const menus = data.detail.menus?.map(menu => ({
          menuId: menu.menu_id,
          menuName: menu.menu_name,
          menuFoodType: menu.menu_food_type,
          outletId: menu.outlet_id,
          menuCatId: menu.menu_cat_id,
          categoryName: menu.category_name,
          spicyIndex: menu.spicy_index,
          portions: menu.portions,
          rating: menu.rating,
          offer: menu.offer,
          isSpecial: menu.is_special,
          isFavourite: menu.is_favourite,
          isActive: menu.is_active,
          image: menu.image
        })) || [];

        setMenuCategories(categories);
        setMenuItems(menus);
        setCacheData({ categories, menus });
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!outletId) return;

    // Try to load cached data first
    const cachedData = getCachedData();
    if (cachedData) {
      setMenuCategories(cachedData.categories);
      setMenuItems(cachedData.menus);
      setIsLoading(false);
    }

    // Fetch fresh data
    fetchMenusByCategory();
  }, [outletId]); // Add outletId as dependency

  return {
    menuCategories,
    menuItems,
    isLoading,
    error,
    refetch: fetchMenusByCategory
  };
};
