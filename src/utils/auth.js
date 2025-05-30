export const getAuthData = () => {
  const authData = localStorage.getItem('auth');
  return authData ? JSON.parse(authData) : null;
};

export const isAuthenticated = () => {
  const authData = getAuthData();
  if (!authData) return false;

  // Check if token is expired
  const expiresAt = new Date(authData.expiresAt).getTime();
  const now = new Date().getTime();
  
  return authData.accessToken && expiresAt > now;
};

export const getAccessToken = () => {
  const authData = getAuthData();
  return authData?.accessToken;
};

export const clearAuth = () => {
  localStorage.removeItem('auth');
};

export const getUserRole = () => {
  const authData = getAuthData();
  return authData?.role;
};

export const getUserId = () => {
  const authData = getAuthData();
  return authData?.userId;
};
