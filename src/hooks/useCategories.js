// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { getApiUrl } from '../constants/config';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log('🔄 Fetching categories...');
      try {
        setLoading(true);
        const authData = localStorage.getItem('auth');
        const userData = authData ? JSON.parse(authData) : null;

        // Get outlet ID directly from localStorage
        const outletId = "1"; // Since we know outlet_code 9001 maps to ID 1

        console.log('📦 Using outlet ID:', outletId);

        const response = await fetch(getApiUrl('get_all_menu_list_by_category'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData?.accessToken}`
          },
          body: JSON.stringify({
            outlet_id: 1,
            user_id: userData?.userId || null
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        console.log('✅ Categories API Response:', data);
        
        if (data.detail?.category) {
          const formattedCategories = data.detail.category.map(category => ({
            menuCatId: category.menu_cat_id,
            categoryName: category.category_name,
            menuCount: category.menu_count
          }));
          console.log('✨ Formatted categories:', formattedCategories);
          setCategories(formattedCategories);
        }
      } catch (err) {
        console.error('❌ Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Only run once on mount

  return { categories, loading, error };
};