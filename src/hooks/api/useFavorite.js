import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const API_BASE_URL = 'https://men4u.xyz/v2';

export const useFavorite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const authData = localStorage.getItem('auth');
      const userData = authData ? JSON.parse(authData) : null;

      if (!userData?.accessToken) {
        throw new Error('Please login to view favorites');
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
        return Object.values(data.detail.lists).flat();
      }
      return [];
    } catch (err) {
      setError(err.message || 'Failed to load favorite items');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (menuId, isFavorite) => {
    setLoading(true);
    setError(null);
    try {
      const authData = localStorage.getItem('auth');
      const userData = authData ? JSON.parse(authData) : null;

      if (!userData?.accessToken) {
        throw new Error('Please login to manage favorites');
      }

      const endpoint = isFavorite 
        ? `${API_BASE_URL}/user/remove_favourite`
        : `${API_BASE_URL}/user/add_favourite`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${userData.accessToken}`
        },
        body: JSON.stringify({
          outlet_id: 1,
          user_id: userData.userId,
          menu_id: menuId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${isFavorite ? 'remove from' : 'add to'} favorites`);
      }

      return data;
    } catch (err) {
      setError(err.message || 'Failed to update favorite status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getFavorites,
    toggleFavorite,
    loading,
    error
  };
}; 