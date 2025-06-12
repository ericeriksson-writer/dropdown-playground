import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import './DropdownPlayground.css';

export const DropdownPlayground: React.FC = () => {
  const [variant, setVariant] = useState<'default' | 'outlined'>('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copySuccess, setCopySuccess] = useState(false);

  const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
  const states = [
    { name: 'Default', props: {} },
    { name: 'Error', props: { error: true } },
    { name: 'Disabled', props: { disabled: true } },
  ];

  const generateFullComponentCode = () => {
    const props = [];
    props.push(`label="Label text"`);
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (size !== 'medium') props.push(`size="${size}"`);
    if (disabled) props.push('disabled');
    if (error) props.push('error');

    return `import React, { useState, useRef, useEffect } from 'react';
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
      className={\`dropdown-container \${className} \${variant} \${size} \${disabled ? 'disabled' : ''} \${error ? 'error' : ''}\`}
      ref={dropdownRef}
    >
      <label className="dropdown-label">
        {label}
        {error && <span className="error-dot" />}
      </label>
      <div 
        className={\`dropdown-select \${isOpen ? 'open' : ''}\`}
        onClick={toggleDropdown}
      >
        <span className="dropdown-value">{selected || 'Select'}</span>
        <svg 
          className={\`dropdown-arrow \${isOpen ? 'open' : ''}\`}
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
              className={\`dropdown-option \${selected === option ? 'selected' : ''}\`}
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

// Usage Example:
// <Dropdown ${props.join(' ')} />`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateFullComponentCode());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="playground">
      <h1>Dropdown Component Playground</h1>
      
      {/* Interactive Demo Section */}
      <section className="interactive-demo">
        
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content-wrapper">
          {activeTab === 'preview' ? (
            <div className="preview-content">
              <div className="dropdown-demo">
                <Dropdown 
                  label="Label text" 
                  variant={variant}
                  size={size}
                  disabled={disabled}
                  error={error}
                />
              </div>
              
              <div className="controls">
                <div className="control-group">
                  <label>Variant:</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="default"
                        checked={variant === 'default'}
                        onChange={(e) => setVariant(e.target.value as 'default' | 'outlined')}
                      />
                      Default
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="outlined"
                        checked={variant === 'outlined'}
                        onChange={(e) => setVariant(e.target.value as 'default' | 'outlined')}
                      />
                      Outlined
                    </label>
                  </div>
                </div>

                <div className="control-group">
                  <label>Size:</label>
                  <div className="radio-group">
                    {sizes.map((s) => (
                      <label key={s} className="radio-label">
                        <input
                          type="radio"
                          value={s}
                          checked={size === s}
                          onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large')}
                        />
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="control-group">
                  <label>States:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={disabled}
                        onChange={(e) => setDisabled(e.target.checked)}
                      />
                      Disabled
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={error}
                        onChange={(e) => setError(e.target.checked)}
                      />
                      Error
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="code-content">
              <div className="code-header">
                <span className="code-title">Complete Dropdown Component</span>
                <button 
                  className={`copy-button ${copySuccess ? 'success' : ''}`}
                  onClick={copyToClipboard}
                >
                  {copySuccess ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
              </div>
              <pre className="code-block">
                <code>{generateFullComponentCode()}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Matrix Section */}
      <section className="matrix-section">
        <h2>Component Matrix</h2>
        <div className="matrix">
          <div className="matrix-header">
            <div className="matrix-cell header-cell">Size / State</div>
            {states.map((state) => (
              <div key={state.name} className="matrix-cell header-cell">
                {state.name}
              </div>
            ))}
          </div>
          
          {sizes.map((currentSize) => (
            <div key={currentSize} className="matrix-row">
              <div className="matrix-cell size-cell">
                {currentSize.charAt(0).toUpperCase() + currentSize.slice(1)}
              </div>
              {states.map((state) => (
                <div key={`${currentSize}-${state.name}`} className="matrix-cell component-cell">
                  <Dropdown 
                    label="Label text" 
                    size={currentSize}
                    {...state.props}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Outlined Variant Matrix */}
        <h3>Outlined Variant</h3>
        <div className="matrix">
          <div className="matrix-header">
            <div className="matrix-cell header-cell">Size / State</div>
            {states.map((state) => (
              <div key={state.name} className="matrix-cell header-cell">
                {state.name}
              </div>
            ))}
          </div>
          
          {sizes.map((currentSize) => (
            <div key={currentSize} className="matrix-row">
              <div className="matrix-cell size-cell">
                {currentSize.charAt(0).toUpperCase() + currentSize.slice(1)}
              </div>
              {states.map((state) => (
                <div key={`${currentSize}-${state.name}`} className="matrix-cell component-cell">
                  <Dropdown 
                    label="Label text" 
                    variant="outlined"
                    size={currentSize}
                    {...state.props}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="playground-info">
        <h3>Features:</h3>
        <ul>
          <li>Click outside to close dropdown</li>
          <li>Blue focus/active state with subtle shadow</li>
          <li>Smooth animations and transitions</li>
          <li>Error state with red indicator dot and styling</li>
          <li>Disabled state</li>
          <li>Outlined variant</li>
          <li>Three sizes: small, medium (default), large</li>
          <li>Hover and focus states</li>
        </ul>
      </div>
    </div>
  );
}; 