import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

interface DropdownProps {
  label: string;
  disabled?: boolean;
  error?: boolean;
  variant?: 'default' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  disabled = false,
  error = false,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div 
      className={`dropdown-container ${className} ${variant} ${size} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
      ref={dropdownRef}
    >
      <label className="dropdown-label">
        {label}
        {error && <span className="error-dot" />}
      </label>
      <div 
        className={`dropdown-select ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <span className="dropdown-value">{selected || 'Select'}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 20 20"
          fill="none"
        >
          <path 
            d="M5 7.5L10 12.5L15 7.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${selected === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 