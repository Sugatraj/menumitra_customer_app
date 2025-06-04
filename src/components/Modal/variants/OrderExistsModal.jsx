import React from 'react';

function OrderExistsModal({ 
  isOpen, 
  onClose, 
  orderNumber,
  orderStatus,
  onCancelExisting, 
  onAddToExisting,
  isLoading // Add loading prop
}) {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-backdrop fade show" style={{ opacity: 0.5, zIndex: 1040 }}></div>
      <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 1045, position: 'relative' }}>
        <div className="modal-content">
          <div className="modal-body text-center p-4">
            <button 
              type="button" 
              className="btn-close position-absolute top-0 end-0 m-3" 
              onClick={onClose}
              aria-label="Close"
              disabled={isLoading}
            ></button>
            
            <h5 className="mb-4">Existing Order Found</h5>
            <p className="mb-4">
              You have an ongoing order (#{orderNumber}). Would you like to cancel this order and create a new one?
            </p>

            <div className="d-grid gap-2">
              <button 
                className="btn text-white"
                style={{
                  backgroundColor: '#FF3B30',
                }}
                onClick={onCancelExisting}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  'Cancel Existing & Create New Order'
                )}
              </button>
              
              <button 
                className="btn text-white"
                style={{
                  backgroundColor: '#007AFF',
                }}
                onClick={onAddToExisting}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  `Add To Existing Order (#${orderNumber})`
                )}
              </button>

              <button 
                className="btn btn-light text-black"
                onClick={onClose}
                disabled={isLoading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderExistsModal;