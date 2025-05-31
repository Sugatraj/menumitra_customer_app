import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import { AddToCartModal } from './variants/AddToCartModal';
import { OrderTypeModal } from './variants/OrderTypeModal';

const ModalManager = () => {
  const { modalConfig } = useModal();

  if (!modalConfig.isOpen) return null;

  const MODAL_COMPONENTS = {
    ADD_TO_CART: AddToCartModal,
    ORDER_TYPE: OrderTypeModal,
    // Add more modal types here
  };

  const SpecificModal = MODAL_COMPONENTS[modalConfig.type];

  return SpecificModal ? <SpecificModal /> : null;
};

export default ModalManager;
