import React, { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
    data: null
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && modalConfig.isOpen) {
        closeModal();
      }
    };

    if (modalConfig.isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [modalConfig.isOpen]);

  const openModal = (type, data = null) => {
    setModalConfig({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: null, data: null });
  };

  return (
    <ModalContext.Provider value={{ modalConfig, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
