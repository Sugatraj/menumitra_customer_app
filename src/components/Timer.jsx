import React, { useState, useEffect } from 'react';

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const TOTAL_SECONDS = 90;

  useEffect(() => {
    if (seconds <= 0) {
      setIsCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = Math.max(0, prevSeconds - 1);
        if (newSeconds === 0) {
          setIsCompleted(true);
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // Checkmark SVG component
  const CheckmarkIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        fill="#00B67A"
      />
    </svg>
  );

  // Get color based on time remaining
  const getColor = (seconds) => {
    if (seconds > 60) return '#00B67A'; // Green for > 60s
    if (seconds > 30) return '#FFA902'; // Yellow/Orange for 30-60s
    return '#E74C3C';                   // Red for < 30s
  };

  if (isCompleted) {
    return (
      <div className="timer-container" style={{ position: 'relative', width: '48px', height: '48px' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CheckmarkIcon />
        </div>
      </div>
    );
  }

  // Calculate progress percentage based on 90 seconds total
  const progress = (seconds / TOTAL_SECONDS) * 100;
  const strokeDashoffset = 283 - (283 * progress) / 100;
  const currentColor = getColor(seconds);

  return (
    <div className="timer-container" style={{ position: 'relative', width: '48px', height: '48px' }}>
      {/* SVG for circular progress */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        style={{ transform: 'rotate(-90deg)', position: 'absolute' }}
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#E8EEF5"
          strokeWidth="10"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={currentColor}
          strokeWidth="10"
          strokeDasharray="283"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Timer text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          fontWeight: '600',
          color: currentColor
        }}
      >
        {seconds}s
      </div>
    </div>
  );
};

export default Timer; 