import React, { useState } from 'react';
import { useOutlet } from '../../../contexts/OutletContext';

function CancelOrderModal({ isOpen, onClose, onConfirm, orderId }) {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { outletId } = useOutlet();

  const predefinedReasons = [
    {
      title: 'Delivery Delays:',
      description: 'Waiting too long, I lost patience.'
    },
    {
      title: 'Change of Mind:',
      description: "Don't want it anymore, found something better."
    },
    {
      title: 'Pricing Concerns:',
      description: 'Extra charges made it too expensive.'
    },
    {
      title: 'Order Errors:',
      description: 'Wrong customization or item, not worth it.'
    },
    {
      title: 'Poor Reviews/Quality Doubts:',
      description: 'Doubts about quality, I canceled quickly.'
    }
  ];

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    
    setIsLoading(true);
    try {
      const auth = JSON.parse(localStorage.getItem("auth")) || {};
      const accessToken = auth.accessToken;

      if (!accessToken) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("https://men4u.xyz/v2/user/cancel_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          outlet_id: outletId,
          order_id: orderId,
          note: reason
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      const data = await response.json();
      
      if (data.status === "success") {
        onConfirm(orderId, reason);
        onClose();
      } else {
        throw new Error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '16px' }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <h6 className="mb-0">Cancel Order</h6>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              disabled={isLoading}
              style={{ fontSize: '0.8rem' }}
            ></button>
          </div>

          {/* Body */}
          <div className="px-3 pb-3">
            {/* Textarea Section */}
            <div className="mb-4">
              <div className="mb-2">
                <span className="text-danger">*</span>
                <span style={{ fontSize: '0.9rem' }}>Please provide a reason for cancellations</span>
              </div>
              <textarea
                className="form-control"
                placeholder="Enter your reason here..."
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isLoading}
                style={{
                  border: '1px solid #E8E8E8',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              ></textarea>
            </div>

            {/* Predefined Reasons Section */}
            <div>
              <p className="text-danger mb-3" style={{ fontSize: '0.9rem' }}>
                Reason for cancellation:
              </p>
              {predefinedReasons.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => !isLoading && setReason(item.description)}
                  style={{ 
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    marginBottom: '12px',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  <p className="mb-0" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {item.title}
                  </p>
                  <p className="mb-0" style={{ 
                    fontSize: '0.85rem', 
                    color: '#666',
                    marginTop: '2px'
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-between p-3 gap-3">
            <button 
              type="button" 
              className="btn flex-grow-1"
              onClick={onClose}
              disabled={isLoading}
              style={{
                backgroundColor: '#F5F5F5',
                color: '#333',
                border: 'none',
                borderRadius: '8px',
                padding: '10px'
              }}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-danger flex-grow-1"
              onClick={handleConfirm}
              disabled={!reason.trim() || isLoading}
              style={{
                backgroundColor: '#FF0000',
                border: 'none',
                borderRadius: '8px',
                padding: '10px'
              }}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="fas fa-times-circle me-2"></i>
              )}
              {isLoading ? 'Cancelling...' : 'Confirm Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelOrderModal;