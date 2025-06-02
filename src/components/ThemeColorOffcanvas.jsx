import React, { useState, useEffect } from 'react';
// import './ThemeColorOffcanvas.css';

const ThemeColorOffcanvas = ({ show, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(() => {
    return localStorage.getItem('themeColor') || 'color-primary';
  });

  const themeColors = [
    { id: 'primary_color_8', value: 'color-primary', label: 'Default' },
    { id: 'primary_color_2', value: 'color-green', label: 'Green' },
    { id: 'primary_color_3', value: 'color-blue', label: 'Blue' },
    { id: 'primary_color_4', value: 'color-pink', label: 'Pink' },
    { id: 'primary_color_5', value: 'color-yellow', label: 'Yellow' },
    { id: 'primary_color_6', value: 'color-orange', label: 'Orange' },
    { id: 'primary_color_7', value: 'color-purple', label: 'Purple' },
    { id: 'primary_color_1', value: 'color-red', label: 'Red' },
    { id: 'primary_color_9', value: 'color-lightblue', label: 'Lightblue' },
    { id: 'primary_color_10', value: 'color-teal', label: 'Teal' },
    { id: 'primary_color_11', value: 'color-lime', label: 'Lime' },
    { id: 'primary_color_12', value: 'color-deeporange', label: 'Deeporange' }
  ];

  useEffect(() => {
    // Apply theme color class to body when component mounts or color changes
    if (selectedColor) {
      // Remove all color classes first
      themeColors.forEach(color => {
        document.body.classList.remove(color.value);
      });
      // Add selected color class
      document.body.classList.add(selectedColor);
      // Save to localStorage
      localStorage.setItem('themeColor', selectedColor);
    }
  }, [selectedColor]);

  const handleColorChange = (colorValue) => {
    setSelectedColor(colorValue);
  };

  if (!show) return null;

  return (
    <>
      <div 
        className="offcanvas-backdrop show" 
        onClick={onClose}
      ></div>
      <div 
        className="offcanvas offcanvas-bottom m-3 rounded show" 
        tabIndex="-1" 
        id="themeColorOffcanvas"
        aria-modal="true" 
        role="dialog"
      >
        <div className="offcanvas-body small">
          <ul className="theme-color-settings">
            {themeColors.map((color) => (
              <li key={color.id}>
                <input
                  className="filled-in"
                  id={color.id}
                  name="theme_color"
                  type="radio"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={() => handleColorChange(color.value)}
                />
                <label 
                  htmlFor={color.id}
                  className={`color-option ${color.value}`}
                ></label>
                <span>{color.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ThemeColorOffcanvas; 