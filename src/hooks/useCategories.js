// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { getApiUrl } from '../constants/config';
import { useOutletId } from '../contexts/OutletIdContext';

export const useCategories = () => {
  const { outletDetails } = useOutletId();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!outletDetails?.outletId) return;
      
      try {
        setLoading(true);
        const authData = localStorage.getItem('auth');
        const userData = authData ? JSON.parse(authData) : null;

        const response = await fetch(getApiUrl('get_all_menu_list_by_category'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData?.accessToken}`
          },
          body: JSON.stringify({
            outlet_id: outletDetails.outletId,
            user_id: userData?.userId || null
          })
        });

        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const data = await response.json();
        
        if (data.detail?.category) {
          setCategories(data.detail.category.map(category => ({
            menuCatId: category.menu_cat_id,
            categoryName: category.category_name,
            menuCount: category.menu_count
          })));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [outletDetails?.outletId]);

  return { categories, loading, error };
};