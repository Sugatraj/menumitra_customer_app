import React from 'react';
import BaseModal from '../BaseModal';
import { useCart } from '../../../contexts/CartContext';
import { useModal } from '../../../contexts/ModalContext';

export const OrderTypeModal = () => {
  const { closeModal } = useModal();
  const { updateOrderSettings, orderSettings } = useCart();

  const handleOrderTypeSelect = (type) => {
    updateOrderSettings({ order_type: type });
    closeModal();
  };

  return (
    <BaseModal 
      title="Select Order Type" 
      onClose={closeModal}
    >
      <div className="d-grid gap-2">
        <button 
          className={`btn ${orderSettings.order_type === 'dine_in' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleOrderTypeSelect('dine_in')}
        >
          Dine In
        </button>
        <button 
          className={`btn ${orderSettings.order_type === 'parcel' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleOrderTypeSelect('parcel')}
        >
          Take Away
        </button>
      </div>
    </BaseModal>
  );
};
