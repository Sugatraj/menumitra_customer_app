import React from 'react';
import PropTypes from 'prop-types';
import Offcanvas from '../shared/Offcanvas';

const InstallPrompt = ({ isOpen, onClose, onInstall }) => {
  return (
    <Offcanvas 
      isOpen={isOpen} 
      onClose={onClose} 
      position="bottom"
      className="pwa-offcanvas m-3 rounded"
    >
      <img className="logo" src="assets/images/icon.png" alt="PWA Icon" />
      <h6 className="title font-w600">MenuMitra on Your Home Screen</h6>
      <p>
        Install MenuMitra mobile app to your home screen for easy access, 
        just like any other app
      </p>
      <button 
        type="button" 
        className="btn btn-sm btn-primary pwa-btn"
        onClick={onInstall}
      >
        Add to Home Screen
      </button>
      <button 
        type="button" 
        className="btn btn-sm pwa-close btn-secondary ms-2 text-white"
        onClick={onClose}
      >
        Maybe later
      </button>
    </Offcanvas>
  );
};

InstallPrompt.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onInstall: PropTypes.func.isRequired,
};

export default InstallPrompt;
