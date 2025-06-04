import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OutletContext = createContext();

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

  const { outletId: urlOutletId, sectionId: urlSectionId, tableId: urlTableId } = useParams();

  useEffect(() => {
    // Update context when URL params change
    if (urlOutletId && urlSectionId && urlTableId) {
      const stored = localStorage.getItem('selectedOutlet');
      if (stored) {
        setOutletInfo(JSON.parse(stored));
      }
    }
  }, [urlOutletId, urlSectionId, urlTableId]);

  const updateOutletInfo = (newInfo) => {
    localStorage.setItem('selectedOutlet', JSON.stringify(newInfo));
    setOutletInfo(newInfo);
  };

  const clearOutletInfo = () => {
    localStorage.removeItem('selectedOutlet');
    setOutletInfo(null);
  };

  return (
    <OutletContext.Provider value={{ 
      outletInfo, 
      updateOutletInfo, 
      clearOutletInfo,
      // Convenience getters for all outlet details
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
    }}>
      {children}
    </OutletContext.Provider>
  );
};
