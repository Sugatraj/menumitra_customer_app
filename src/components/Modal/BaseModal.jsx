import React, { useEffect } from 'react';
import { useModal } from '../../contexts/ModalContext';

const BaseModal = ({ 
  isOpen,
  title, 
  children, 
  footer,
  onClose,
  size = 'modal-dialog-centered' // default size
}) => {
  if (!isOpen) return null;

  // Add body class when modal opens
  useEffect(() => {
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';

    // Cleanup when modal closes
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040
        }}
      />

      {/* Modal */}
      <div 
        className="modal fade show" 
        style={{ 
          display: 'block',
          zIndex: 1045,
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }} 
        aria-modal="true" 
        role="dialog"
      >
        <div className={`modal-dialog ${size}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button 
                className="btn-close" 
                onClick={onClose}
                type="button"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            {footer && (
              <div className="modal-footer">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseModal;
