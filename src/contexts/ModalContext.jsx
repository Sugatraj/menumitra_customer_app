import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    orderType: false
  });

  const openModal = (modalId) => {
    setModals(prev => ({
      ...prev,
      [modalId]: true
    }));
  };

  const closeModal = (modalId) => {
    setModals(prev => ({
      ...prev,
      [modalId]: false
    }));
  };

  return (
    <ModalContext.Provider value={{
      modals,
      openModal,
      closeModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
