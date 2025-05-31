import React, { useState } from 'react';
import BaseModal from '../BaseModal';
import { useCart } from '../../../contexts/CartContext';
import { useModal } from '../../../contexts/ModalContext';

export const AddToCartModal = () => {
  const { closeModal, modalConfig } = useModal();
  const { addToCart } = useCart();
  const [selectedPortion, setSelectedPortion] = useState(
    modalConfig.data?.portions?.[0]?.portion_id
  );
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');

  const MAX_QUANTITY = 20;

  const handleQuantityChange = (newQuantity) => {
    // Ensure quantity stays between 1 and MAX_QUANTITY
    setQuantity(Math.min(Math.max(1, newQuantity), MAX_QUANTITY));
  };

  const handleAddToCart = () => {
    addToCart(modalConfig.data, selectedPortion, quantity, comment);
    closeModal();
  };

  return (
    <BaseModal 
      title="Add to Cart" 
      onClose={closeModal}
    >
      <div className="mb-4">
        <label className="text-secondary mb-2" style={{ fontSize: '14px' }}>
          Select Portion
        </label>
        <div className="row g-2">
          {modalConfig.data?.portions?.length > 0 ? (
            modalConfig.data.portions.map(portion => (
              <div 
                className={`${modalConfig.data.portions.length === 1 ? 'col-12' : 
                             modalConfig.data.portions.length === 2 ? 'col-6' : 'col-4'}`}
                key={portion.portion_id}
              >
                <div 
                  onClick={() => setSelectedPortion(portion.portion_id)}
                  style={{
                    border: `1.5px solid ${selectedPortion === portion.portion_id ? '#28a745' : '#e9ecef'}`,
                    borderRadius: '12px',
                    padding: '12px 8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedPortion === portion.portion_id ? '#f8fff8' : 'white'
                  }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <span style={{ 
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#212529',
                      marginBottom: '4px'
                    }}>
                      ₹{portion.price}
                    </span>
                    <span style={{ 
                      fontSize: '13px',
                      color: '#6c757d',
                      textTransform: 'capitalize'
                    }}>
                      {portion.portion_name.toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">
              No portion sizes available
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          className="mb-2"
          style={{
            fontSize: '14px',
            color: '#19b5fe',
            fontWeight: 400,
            display: 'block'
          }}
        >
          Quantity
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '8px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #28a745',
              borderRadius: '999px',
              padding: '5px 5px',
              background: 'white',
            }}
          >
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#07813a',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                transition: 'background 0.2s',
                opacity: quantity <= 1 ? 0.5 : 1, // Visual feedback for min limit
              }}
              disabled={quantity <= 1}
            >
              –
            </button>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 400,
                color: '#23232b',
                minWidth: '24px',
                textAlign: 'center'
              }}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#07813a',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '20px',
                transition: 'background 0.2s',
                opacity: quantity >= MAX_QUANTITY ? 0.5 : 1, // Visual feedback for max limit
              }}
              disabled={quantity >= MAX_QUANTITY}
            >
              +
            </button>
          </div>
        </div>
        {quantity >= MAX_QUANTITY && (
          <div className="text-center mt-2" style={{ color: '#dc3545', fontSize: '12px' }}>
            Maximum quantity limit reached
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-secondary mb-2" style={{ fontSize: '14px' }}>
          Special Instructions
        </label>
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Any special instructions?"
          style={{
            border: '1.5px solid #e9ecef',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '15px',
            minHeight: '80px',
            resize: 'none'
          }}
          onFocus={(e) => e.target.style.border = '1.5px solid #28a745'}
          onBlur={(e) => e.target.style.border = '1.5px solid #e9ecef'}
        />
      </div>

      <div className="d-flex gap-2 mt-4">
        <button 
          type="button" 
          className="btn flex-grow-1" 
          onClick={closeModal}
          style={{
            backgroundColor: '#f8f9fa',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '15px',
            fontWeight: '500'
          }}
        >
          Cancel
        </button>
        <button 
          type="button" 
          className="btn btn-success flex-grow-1" 
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '15px',
            fontWeight: '500'
          }}
        >
          Add to Cart
        </button>
      </div>
    </BaseModal>
  );
};
