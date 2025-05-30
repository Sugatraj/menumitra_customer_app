import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Offcanvas from '../shared/Offcanvas';
import { useAuth } from '../../contexts/AuthContext';

const STEPS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  OTP: 'otp'
};

const API_BASE_URL = 'https://men4u.xyz/v2';

const AuthOffcanvas = () => {
  const { showAuthOffcanvas, setShowAuthOffcanvas, handleLoginSuccess } = useAuth();
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setCurrentStep(STEPS.LOGIN);
    setPhoneNumber('');
    setOtp('');
    setUserDetails({ name: '', email: '' });
    setError('');
    setShowAuthOffcanvas(false);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/common/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          mobile: phoneNumber
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.role === 'customer') {
          setCurrentStep(STEPS.OTP);
        } else {
          setError('This mobile number is not registered as a customer.');
        }
      } else {
        setError(data.detail || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // API call to create new user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          ...userDetails
        })
      });

      if (response.ok) {
        setCurrentStep(STEPS.OTP);
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/common/verify-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          phone: phoneNumber,
          country_code: '+91',
          otp: otp
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store auth token if provided
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Pass user data to context
        handleLoginSuccess(data.user);
        handleClose();
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/common/resend-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          phone: phoneNumber,
          country_code: '+91'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Show success message
        setError('OTP resent successfully!');
        setTimeout(() => setError(''), 3000); // Clear message after 3 seconds
      } else {
        throw new Error(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginStep = () => (
    <div className="px-1">
      <h6 className="title font-w600 mb-4">Login to MenuMitra</h6>
      {error && (
        <div className={`alert ${error.includes('successfully') ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>
          {error}
        </div>
      )}
      <form onSubmit={handlePhoneSubmit}>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <div className="input-group">
            <span className="input-group-text">+91</span>
            <input
              type="tel"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setPhoneNumber(value);
                }
              }}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
              disabled={isLoading}
            />
          </div>
          <small className="text-muted">Enter 10 digit mobile number</small>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading || phoneNumber.length !== 10}
        >
          {isLoading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Please wait...
            </span>
          ) : (
            'Get OTP'
          )}
        </button>
      </form>
    </div>
  );

  const renderSignupStep = () => (
    <div className="px-1">
      <h6 className="title font-w600 mb-4">Create Account</h6>
      {error && (
        <div className="alert alert-danger py-2 mb-3">{error}</div>
      )}
      <form onSubmit={handleSignupSubmit}>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <div className="input-group">
            <span className="input-group-text">+91</span>
            <input
              type="tel"
              className="form-control"
              value={phoneNumber}
              disabled
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.name}
            onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email (Optional)</label>
          <input
            type="email"
            className="form-control"
            value={userDetails.email}
            onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        <button 
          type="button" 
          className="btn btn-link w-100 mt-2"
          onClick={() => setCurrentStep(STEPS.LOGIN)}
          disabled={isLoading}
        >
          Back to Login
        </button>
      </form>
    </div>
  );

  const renderOTPStep = () => (
    <div className="px-1">
      <h6 className="title font-w600 mb-4">Verify OTP</h6>
      {error && (
        <div className={`alert ${error.includes('success') ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>
          {error}
        </div>
      )}
      <p className="text-muted mb-4">
        Enter the verification code sent to +91 {phoneNumber}
      </p>
      <form onSubmit={handleOTPSubmit}>
        <div className="mb-4">
          <input
            type="text"
            className="form-control form-control-lg text-center"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 6) {
                setOtp(value);
              }
            }}
            placeholder="• • • • • •"
            maxLength={6}
            pattern="[0-9]{6}"
            required
            disabled={isLoading}
            autoComplete="one-time-code"
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Verifying...
            </span>
          ) : (
            'Verify OTP'
          )}
        </button>
        <div className="d-flex justify-content-between mt-3">
          <button 
            type="button" 
            className="btn btn-link"
            onClick={() => setCurrentStep(STEPS.LOGIN)}
            disabled={isLoading}
          >
            Change Number
          </button>
          <button 
            type="button" 
            className="btn btn-link"
            onClick={handleResendOTP}
            disabled={isLoading}
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Offcanvas 
      isOpen={showAuthOffcanvas} 
      onClose={handleClose} 
      position="bottom"
      className="auth-offcanvas m-3 rounded"
    >
      {currentStep === STEPS.LOGIN && renderLoginStep()}
      {currentStep === STEPS.SIGNUP && renderSignupStep()}
      {currentStep === STEPS.OTP && renderOTPStep()}
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
