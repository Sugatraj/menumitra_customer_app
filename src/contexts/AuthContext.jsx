import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthOffcanvas, setShowAuthOffcanvas] = useState(false);

  useEffect(() => {
    // Check localStorage for existing auth data on mount
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedData = JSON.parse(authData);
      setUser({
        id: parsedData.userId,
        name: parsedData.name,
        role: parsedData.role,
        mobile: parsedData.mobile
      });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      role: userData.role,
      mobile: userData.mobile
    });
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        showAuthOffcanvas,
        setShowAuthOffcanvas,
        handleLoginSuccess,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
