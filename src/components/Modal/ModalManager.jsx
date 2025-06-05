import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import { AddToCartModal } from './variants/AddToCartModal';
import { OrderTypeModal } from './variants/OrderTypeModal';

const ModalManager = () => {
  const { modals } = useModal();

  if (!modals.orderType) return null;

  const MODAL_COMPONENTS = {
    ADD_TO_CART: AddToCartModal,
    ORDER_TYPE: OrderTypeModal,
    // Add more modal types here
  };

  const SpecificModal = MODAL_COMPONENTS[modals.orderType];

  return SpecificModal ? <SpecificModal /> : null;
};

export default ModalManager;
