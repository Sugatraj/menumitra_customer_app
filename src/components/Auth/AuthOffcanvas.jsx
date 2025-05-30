import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Offcanvas from '../shared/Offcanvas';
import { useAuth } from '../../contexts/AuthContext';

const STEPS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  OTP: 'otp'
};

const AuthOffcanvas = () => {
  const { showAuthOffcanvas, setShowAuthOffcanvas, handleLoginSuccess } = useAuth();
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });

  const handleClose = () => {
    setCurrentStep(STEPS.LOGIN);
    setPhoneNumber('');
    setOtp('');
    setUserDetails({ name: '', email: '' });
    setShowAuthOffcanvas(false);
  };

  const handleOTPSuccess = async (userData) => {
    handleLoginSuccess(userData);
  };

  // ... rest of the component code remains same ...

  return (
    <Offcanvas 
      isOpen={showAuthOffcanvas} 
      onClose={handleClose} 
      position="bottom"
      className="auth-offcanvas m-3 rounded"
    >
      {/* ... rest of the JSX remains same ... */}
    </Offcanvas>
  );
};

AuthOffcanvas.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  defaultStep: PropTypes.oneOf(Object.values(STEPS)),
};

export default AuthOffcanvas;
