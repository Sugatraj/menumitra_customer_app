export const clearAppData = () => {
  // Clear all relevant localStorage data
  const keysToKeep = ['theme', 'language']; // Add any keys you want to preserve
  
  Object.keys(localStorage).forEach(key => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};
