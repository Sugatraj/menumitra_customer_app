// src/hooks/useCategories.js
import { useQuery } from '@tanstack/react-query';
import { getApiUrl } from '../constants/config';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // Get auth data from localStorage
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
          outlet_id: 1
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();

      // Transform the data to match the expected format
      if (data.detail && data.detail.category) {
        return data.detail.category.map(category => ({
          menuCatId: category.menu_cat_id,
          categoryName: category.category_name,
          menuCount: category.menu_count
        }));
      }
      
      return [];
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache for 30 minutes
  });
};