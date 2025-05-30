import React from 'react';
import PropTypes from 'prop-types';

const Offcanvas = ({
  isOpen,
  onClose,
  position = 'bottom',
  className = '',
  showBackdrop = true,
  children,
  containerClassName = '',
}) => {
  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Position classes
  const positionClasses = {
    bottom: 'offcanvas-bottom',
    top: 'offcanvas-top',
    start: 'offcanvas-start',
    end: 'offcanvas-end',
  };

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div 
          className={`offcanvas-backdrop${isOpen ? ' show' : ''}`} 
          onClick={handleBackdropClick}
          style={{ display: isOpen ? 'block' : 'none' }}
        />
      )}

      {/* Offcanvas */}
      <div 
        className={`offcanvas ${positionClasses[position]} ${className}${isOpen ? ' show' : ''}`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        <div className={`container ${containerClassName}`}>
          <div className="offcanvas-body small">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Offcanvas.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['bottom', 'top', 'start', 'end']),
  className: PropTypes.string,
  showBackdrop: PropTypes.bool,
  children: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
};

export default Offcanvas;
