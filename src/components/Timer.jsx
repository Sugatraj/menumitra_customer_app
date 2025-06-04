import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(85);
  
  // Calculate circle properties
  const radius = 18; // Adjusted for 40px container
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((85 - timeLeft) / 85) * circumference;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="position-relative" style={{ width: '40px', height: '40px' }}>
      {/* Background Circle */}
      <div 
        style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          backgroundColor: '#FFF3E5',
          borderRadius: '50%',
        }}
      />
      
      {/* SVG for animated border */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        style={{ 
          transform: 'rotate(-90deg)',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#FFA902"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s linear'
          }}
        />
      </svg>

      {/* Timer Text */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#FFA902',
          fontSize: '16px', // Increased for 40px container
          fontWeight: '600',
          lineHeight: 1,
          zIndex: 1
        }}
      >
        {timeLeft}
      </div>
    </div>
  );
};

export default Timer; 