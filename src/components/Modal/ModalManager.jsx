import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import { AddToCartModal } from './variants/AddToCartModal';
import { OrderTypeModal } from './variants/OrderTypeModal';

const ModalManager = () => {
  const { modals } = useModal();

  return (
    <>
      {modals.addToCart && <AddToCartModal />}
      {modals.orderType && <OrderTypeModal />}
    </>
  );
};

export default ModalManager;
