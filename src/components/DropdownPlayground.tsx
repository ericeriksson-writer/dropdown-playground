import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import './DropdownPlayground.css';

export const DropdownPlayground: React.FC = () => {
  const [variant, setVariant] = useState<'default' | 'outlined'>('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
  const states = [
    { name: 'Default', props: {} },
    { name: 'Error', props: { error: true } },
    { name: 'Disabled', props: { disabled: true } },
  ];

  return (
    <div className="playground">
      <h1>Dropdown Component Playground</h1>
      
      {/* Interactive Demo Section */}
      <section className="interactive-demo">
        <h2>Interactive Demo</h2>
        <div className="demo-container">
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