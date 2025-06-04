import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthOffcanvas, setShowAuthOffcanvas] = useState(false);

  useEffect(() => {
    // Check localStorage for existing auth data on mount
    const auth = localStorage.getItem('auth');
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      setUser({
        id: parsedAuth.userId,
        name: parsedAuth.name,
        role: parsedAuth.role,
        mobile: parsedAuth.mobile,
        accessToken: parsedAuth.accessToken,
        expiresAt: parsedAuth.expiresAt
      });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    // Store auth data in localStorage
    const auth = {
      userId: userData.user_id,
      name: userData.name,
      role: userData.role,
      mobile: userData.mobile,
      accessToken: userData.access_token,
      expiresAt: userData.expires_at
    };
    
    localStorage.setItem('auth', JSON.stringify(auth));
    
    setUser({
      id: userData.user_id,
      name: userData.name,
      role: userData.role,
      mobile: userData.mobile,
      accessToken: userData.access_token,
      expiresAt: userData.expires_at
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
