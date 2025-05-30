import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthOffcanvas, setShowAuthOffcanvas] = useState(false);
  const [authCallback, setAuthCallback] = useState(null);

  const requireAuth = (callback) => {
    if (isAuthenticated) {
      // If user is already authenticated, execute callback immediately
      callback();
    } else {
      // Store callback and show auth offcanvas
      setAuthCallback(() => callback);
      setShowAuthOffcanvas(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthOffcanvas(false);
    
    // Execute stored callback if exists
    if (authCallback) {
      authCallback();
      setAuthCallback(null);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Additional logout logic (clear tokens etc.)
  };

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated,
        user,
        showAuthOffcanvas,
        setShowAuthOffcanvas,
        requireAuth,
        handleLoginSuccess,
        logout
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
