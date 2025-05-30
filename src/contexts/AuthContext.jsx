import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAuthData, clearAuth } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthOffcanvas, setShowAuthOffcanvas] = useState(false);

  useEffect(() => {
    // Check localStorage for existing auth data on mount
    const authData = getAuthData();
    if (authData) {
      setUser({
        id: authData.userId,
        name: authData.name,
        role: authData.role
      });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

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
