import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const OutletIdContext = createContext();

const STORAGE_KEY = 'menumitra_outlet_details';

export const useOutletId = () => {
  const context = useContext(OutletIdContext);
  if (!context) {
    throw new Error('useOutletId must be used within an OutletIdProvider');
  }
  return context;
};

export const OutletIdProvider = ({ children }) => {
  const [outletDetails, setOutletDetails] = useState(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchOutletDetails = async (outletCode) => {
    if (hasInitialized || outletDetails) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('https://men4u.xyz/v2/user/get_restaurant_details_by_code', {
        outlet_code: outletCode
      });

      if (response.data?.data?.outlet_details) {
        const details = response.data.data.outlet_details;
        
        // Format the data consistently with your existing structure
        const formattedDetails = {
          outletId: details.outlet_id,
          outletCode: outletCode,
          outletName: details.name,
          isOpen: details.is_open,
          mobile: details.mobile,
          fssaiNumber: details.fssainumber,
          gstNumber: details.gstnumber,
          address: details.address,
          ownerId: details.owner_id,
          outletType: details.outlet_type,
          outletVegNonveg: details.outlet_veg_nonveg,
          whatsapp: details.whatsapp,
          facebook: details.facebook,
          instagram: details.instagram,
          website: details.website,
          googleReview: details.google_review,
          googleBusinessLink: details.google_business_link,
          sectionName: details.section_name
        };

        // Update state with formatted data
        setOutletDetails(formattedDetails);
        
        // Store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedDetails));
        
        setHasInitialized(true);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch outlet details');
      setOutletDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount if no data exists
  useEffect(() => {
    if (!hasInitialized && !outletDetails) {
      fetchOutletDetails('9001');
    }
  }, []);

  const clearOutletDetails = () => {
    setOutletDetails(null);
    setError(null);
    setHasInitialized(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    outletDetails,
    loading,
    error,
    fetchOutletDetails,
    clearOutletDetails,
    // Add these for direct access
    outletId: outletDetails?.outletId || null,
    outletCode: outletDetails?.outletCode || null,
    outletName: outletDetails?.outletName || null
  };

  return (
    <OutletIdContext.Provider value={value}>
      {children}
    </OutletIdContext.Provider>
  );
};

export default OutletIdContext;