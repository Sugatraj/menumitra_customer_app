import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const OutletContext = createContext();

// Add regex pattern to extract codes
const URL_PATTERN = /^o(\d+)\/s(\d+)\/t(\d+)$/;

export const useOutlet = () => {
  const context = useContext(OutletContext);
  if (!context) {
    throw new Error('useOutlet must be used within an OutletProvider');
  }
  return context;
};

export const OutletProvider = ({ children }) => {
  const [outletInfo, setOutletInfo] = useState(() => {
    const stored = localStorage.getItem('selectedOutlet');
    return stored ? JSON.parse(stored) : null;
  });

  const parseOutletUrl = (url) => {
    const matches = url.match(URL_PATTERN);
    if (matches) {
      return {
        outletCode: matches[1],
        sectionId: matches[2],
        tableId: matches[3]
      };
    }
    return null;
  };

  useEffect(() => {
    const initializeOutlet = async () => {
      // Get full pathname and check for our pattern
      const fullPath = window.location.pathname;
      const match = fullPath.match(/\/o(\d+)\/s(\d+)\/t(\d+)$/);
      
      if (match) {
        // URL has the pattern, extract codes
        const [, outletCode, sectionId, tableId] = match;
        console.log('URL Pattern found:', { outletCode, sectionId, tableId });
        
        // Store these values immediately
        localStorage.setItem('outletCode', outletCode);
        localStorage.setItem('sectionId', sectionId);
        localStorage.setItem('tableId', tableId);
        
        // Always fetch fresh data when URL pattern is present
        await fetchOutletDetailsByCode(outletCode);
      } else {
        // No URL pattern, try localStorage
        const storedOutletCode = localStorage.getItem('outletCode');
        const storedOutlet = localStorage.getItem('selectedOutlet');
        
        if (storedOutletCode && !storedOutlet) {
          // We have a code but no details, fetch them
          console.log('Using stored outlet code:', storedOutletCode);
          await fetchOutletDetailsByCode(storedOutletCode);
        } else if (storedOutlet) {
          console.log('Using stored outlet details');
          setOutletInfo(JSON.parse(storedOutlet));
        }
      }
    };

    initializeOutlet().catch(error => {
      console.error('Failed to initialize outlet:', error);
    });
  }, []); // Run only on mount

  const fetchOutletDetailsByCode = async (outletCode) => {
    try {
      const response = await axios.post('https://men4u.xyz/v2/user/get_restaurant_details_by_code', {
        outlet_code: outletCode
      });
      
      if (response.data?.data?.outlet_details) {
        const details = response.data.data.outlet_details;
        const formattedOutletInfo = {
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
          sectionName: details.section_name,
          // Include section and table IDs
          sectionId: localStorage.getItem('sectionId'),
          tableId: localStorage.getItem('tableId')
        };

        // Store complete outlet info in localStorage
        localStorage.setItem('selectedOutlet', JSON.stringify(formattedOutletInfo));
        setOutletInfo(formattedOutletInfo);
        return formattedOutletInfo;
      }
    } catch (error) {
      console.error('Error fetching outlet details:', error);
      throw error;
    }
  };

  const updateOutletInfo = (newInfo) => {
    // Ensure we preserve section and table IDs when updating
    const updatedInfo = {
      ...newInfo,
      sectionId: newInfo.sectionId || localStorage.getItem('sectionId'),
      tableId: newInfo.tableId || localStorage.getItem('tableId')
    };
    localStorage.setItem('selectedOutlet', JSON.stringify(updatedInfo));
    setOutletInfo(updatedInfo);
  };

  const clearOutletInfo = () => {
    localStorage.removeItem('selectedOutlet');
    localStorage.removeItem('outletCode');
    localStorage.removeItem('sectionId');
    localStorage.removeItem('tableId');
    setOutletInfo(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    outletInfo,
    updateOutletInfo,
    clearOutletInfo,
    fetchOutletDetailsByCode,
    // Convenience getters with null checks
    outletId: outletInfo?.outletId,
    outletCode: outletInfo?.outletCode,
    sectionId: outletInfo?.sectionId,
    tableId: outletInfo?.tableId,
    outletName: outletInfo?.outletName,
    isOpen: outletInfo?.isOpen,
    mobile: outletInfo?.mobile,
    fssaiNumber: outletInfo?.fssaiNumber,
    gstNumber: outletInfo?.gstNumber,
    address: outletInfo?.address,
    ownerId: outletInfo?.ownerId,
    outletType: outletInfo?.outletType,
    outletVegNonveg: outletInfo?.outletVegNonveg,
    whatsapp: outletInfo?.whatsapp,
    facebook: outletInfo?.facebook,
    instagram: outletInfo?.instagram,
    website: outletInfo?.website,
    googleReview: outletInfo?.googleReview,
    googleBusinessLink: outletInfo?.googleBusinessLink,
    sectionName: outletInfo?.sectionName
  }), [outletInfo]);

  return (
    <OutletContext.Provider value={contextValue}>
      {children}
    </OutletContext.Provider>
  );
};
