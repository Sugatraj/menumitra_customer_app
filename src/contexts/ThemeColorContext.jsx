import React, { createContext, useContext, useState } from 'react';

const ThemeColorContext = createContext();

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider');
  }
  return context;
};

export const ThemeColorProvider = ({ children }) => {
  const [showThemeColorOffcanvas, setShowThemeColorOffcanvas] = useState(false);

  const toggleThemeColorOffcanvas = () => {
    setShowThemeColorOffcanvas(prev => !prev);
  };

  const value = {
    showThemeColorOffcanvas,
    toggleThemeColorOffcanvas
  };

  return (
    <ThemeColorContext.Provider value={value}>
      {children}
    </ThemeColorContext.Provider>
  );
}; 