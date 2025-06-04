import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const OutletIdContext = createContext();

export const useOutletId = () => {
  const context = useContext(OutletIdContext);
  if (!context) {
    throw new Error('useOutletId must be used within an OutletIdProvider');
  }
  return context;
};

export const OutletIdProvider = ({ children }) => {
  console.log('🏁 OutletIdProvider Mounting');
  
  const [outletDetails, setOutletDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOutletDetails = async () => {
    // If we already have details, don't fetch again
    if (outletDetails) {
      console.log('📦 Already have outlet details, skipping fetch');
      return;
    }

    console.log('🚀 Fetching outlet details for code: 9001');
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('https://men4u.xyz/v2/user/get_restaurant_details_by_code', {
        outlet_code: "9001"  // Hardcoded outlet code
      });

      console.log('✅ API Response received:', response.data);

      if (response.data?.data?.outlet_details) {
        const details = response.data.data.outlet_details;
        
        // Store only outlet_id in localStorage
        localStorage.setItem('outletId', details.outlet_id);
        
        const formattedDetails = {
          outletId: details.outlet_id,
          outletCode: "9001",
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

        console.log('✨ Setting formatted details:', formattedDetails);
        setOutletDetails(formattedDetails);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err.message || 'Failed to fetch outlet details');
      setOutletDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Single effect to fetch on mount
  useEffect(() => {
    console.log('🔄 Initial mount effect running');
    fetchOutletDetails();
  }, []); // Empty dependency array ensures single call on mount

  const value = {
    outletDetails,
    loading,
    error,
    outletId: outletDetails?.outletId || null,
    outletCode: "9001", // Always return hardcoded outlet code
    outletName: outletDetails?.outletName || null
  };

  // Log state changes
  useEffect(() => {
    console.log('📊 Context State Updated:', {
      hasData: !!outletDetails,
      loading,
      error
    });
  }, [outletDetails, loading, error]);

  return (
    <OutletIdContext.Provider value={value}>
      {children}
    </OutletIdContext.Provider>
  );
};

export default OutletIdContext;