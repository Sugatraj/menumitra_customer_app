import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Calculate circle properties
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((85 - timeLeft) / 85) * circumference;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsCompleted(true);
    }
  }, [timeLeft]);

  return (
    <div className="position-relative" style={{ width: '40px', height: '40px' }}>
      {!isCompleted ? (
        // Timer View
        <>
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
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: 1,
              zIndex: 1
            }}
          >
            {timeLeft}
          </div>
        </>
      ) : (
        // Success Checkmark View
        <div className="success-container" style={{
          width: '40px',
          height: '40px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40"
            className="success-circle"
          >
            <circle
              cx="20"
              cy="20"
              r="20"
              fill="#1cbd5c"
            />
            <path
              d="M12 20L17 25L28 14"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="checkmark"
            />
          </svg>
        </div>
      )}

      <style>
        {`
          .success-container {
            transform-origin: center;
          }
          
          .success-circle {
            animation: scaleIn 0.3s ease-out forwards;
            transform-origin: center;
          }

          .checkmark {
            stroke-dasharray: 30;
            stroke-dashoffset: 30;
            animation: drawCheck 0.5s ease-out 0.3s forwards;
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }

          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Timer; 