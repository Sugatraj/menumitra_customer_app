import React from 'react';
import { Link } from 'react-router-dom';

const TestEnvironmentBanner = () => {
  // Check if current domain is production
  const isProductionDomain = () => {
    const hostname = window.location.hostname;
    return hostname === 'menumitra.com' || 
           hostname === 'user.menumitra.com' ||
           hostname === 'www.menumitra.com' ||
           hostname === 'www.user.menumitra.com';
  };

  // Return null (render nothing) if on production domain
  if (isProductionDomain()) {
    return null;
  }

  return (
    <div 
      className="text-white d-flex justify-content-between align-items-center px-3 py-2"
      style={{
        backgroundColor: 'orange',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="flex-grow-1 text-center d-flex align-items-center justify-content-center">
        <svg 
          viewBox="0 0 24 24" 
          width="18" 
          height="18" 
          fill="currentColor" 
          className="me-2"
        >
          <path d="M12 19.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-2.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-1-5h2v2h-2v-2zm0-6h2v4h-2V6z"/>
        </svg>
        <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>
          TESTING ENVIRONMENT
        </span>
      </div>
      <Link 
        to="https://user.menumitra.com/" 
        className="btn d-flex align-items-center"
        target="_blank"
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          color: '#027335',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          fontWeight: '600',
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Prod
        <svg 
          className="ms-1 mt-0" 
          style={{ width: '0.68em', height: '0.68em' }}
          viewBox="0 0 10 10" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
        >
          <path 
            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" 
            stroke="currentColor" 
            strokeWidth="1.25" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

export default TestEnvironmentBanner;
