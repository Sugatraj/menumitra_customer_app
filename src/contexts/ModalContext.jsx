import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    orderType: false,
    addToCart: false
  });
  const [modalConfig, setModalConfig] = useState({});

  const openModal = (modalId, data = null) => {
    setModals(prev => ({
      ...prev,
      [modalId]: true
    }));
    if (data) {
      setModalConfig({ data });
    }
  };

  const closeModal = () => {
    setModals(prev => {
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      return newState;
    });
    setModalConfig({});
  };

  return (
    <ModalContext.Provider value={{
      modals,
      modalConfig,
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
