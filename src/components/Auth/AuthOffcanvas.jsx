import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (currentStep === STEPS.OTP) {
      const otpInputs = document.querySelectorAll('#otp input');
      
      const handleOTPInput = (e) => {
        const input = e.target;
        const value = input.value.replace(/\D/g, '');
        
        if (value) {
          input.value = value;
          
          const next = input.getAttribute('data-next');
          if (next && value.length === 1) {
            const nextInput = document.getElementById(next);
            if (nextInput) {
              nextInput.focus();
            }
          }
        }
      };

      const handleKeyDown = (e) => {
        const input = e.target;
        
        if (e.key === 'Backspace' && !input.value) {
          const prev = input.getAttribute('data-previous');
          if (prev) {
            const prevInput = document.getElementById(prev);
            if (prevInput) {
              prevInput.focus();
            }
          }
        }
      };

      const updateOTPState = () => {
        const digits = [...otpInputs].map(input => input.value).join('');
        setOtp(digits);
      };

      otpInputs.forEach(input => {
        input.addEventListener('input', (e) => {
          handleOTPInput(e);
          updateOTPState();
        });
        input.addEventListener('keydown', handleKeyDown);
      });

      otpInputs[0]?.focus();

      return () => {
        otpInputs.forEach(input => {
          input.removeEventListener('input', handleOTPInput);
          input.removeEventListener('keydown', handleKeyDown);
        });
      };
    }
  }, [currentStep]);

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

    // Hardcoded device info for now
    const deviceInfo = {
      fcm_token: "457896354789",
      device_id: "8974561234",
      device_model: "Laptop 122"
    };

    try {
      const response = await fetch(`${API_BASE_URL}/common/verify_otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          otp: otp,
          ...deviceInfo
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('auth', JSON.stringify({
          userId: data.user_id,
          name: data.name,
          role: data.role,
          accessToken: data.access_token,
          expiresAt: data.expires_at
        }));

        // Pass user data to context
        handleLoginSuccess({
          id: data.user_id,
          name: data.name,
          role: data.role
        });

        // Close the auth modal
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
      
      {/* Add divider and register button */}
      <div className="text-center mt-4">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          <div className="border-bottom flex-grow-1"></div>
          <button 
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={() => setCurrentStep(STEPS.SIGNUP)}
            disabled={isLoading}
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'opacity 0.2s ease',
              color: '#6c757d'
            }}
          >
            New to MenuMitra? <span className="ms-2" style={{ color: '#027335' }}>Register 
              <svg 
                className="ms-1 mt-0" 
                viewBox="0 0 10 10" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true" 
                style={{
                  width: '0.68em', 
                  height: '0.68em',
                  color: '#027335'
                }}
              >
                <path 
                  d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" 
                  stroke="currentColor" 
                  strokeWidth="1.25" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <div className="border-bottom flex-grow-1"></div>
        </div>
      </div>
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
          <div id="otp" className="digit-group d-flex gap-2 justify-content-center">
            <input
              className="form-control text-center"
              type="text"
              id="digit-1"
              name="digit-1"
              placeholder="-"
              data-next="digit-2"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              disabled={isLoading}
            />
            <input
              className="form-control text-center"
              type="text"
              id="digit-2"
              name="digit-2"
              placeholder="-"
              data-next="digit-3"
              data-previous="digit-1"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              required
              disabled={isLoading}
            />
            <input
              className="form-control text-center"
              type="text"
              id="digit-3"
              name="digit-3"
              placeholder="-"
              data-next="digit-4"
              data-previous="digit-2"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              required
              disabled={isLoading}
            />
            <input
              className="form-control text-center"
              type="text"
              id="digit-4"
              name="digit-4"
              placeholder="-"
              data-previous="digit-3"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading || otp.length !== 4}
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
