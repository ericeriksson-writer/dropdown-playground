import React, { useState } from 'react';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import './MenuPlayground.css';

export const MenuPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Menu configuration state
  const [menuWidth, setMenuWidth] = useState(240);
  const [includeSearch, setIncludeSearch] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [includeDividers, setIncludeDividers] = useState(true);
  const [includeIcons, setIncludeIcons] = useState(true);

  const generateFullComponentCode = () => {
    return `import React from 'react';
import './Menu.css';
import './MenuItem.css';

interface MenuItemProps {
  label?: string;
  type?: 'item' | 'search' | 'header' | 'header-multiselect' | 'divider' | 'submenu';
  state?: 'default' | 'hover' | 'active' | 'disabled';
  leftIcon?: boolean;
  rightIcon?: boolean;
  checkbox?: boolean;
  detail?: string;
  onClick?: () => void;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label = 'Label',
  type = 'item',
  state = 'default',
  leftIcon = false,
  rightIcon = false,
  checkbox = false,
  detail,
  onClick,
  className = '',
}) => {
  if (type === 'divider') {
    return <div className={\`menu-item-divider \${className}\`} />;
  }

  if (type === 'header' || type === 'header-multiselect') {
    return (
      <div className={\`menu-item-header \${className} \${type}\`}>
        <span className="menu-item-header-text">{label}</span>
        {type === 'header-multiselect' && (
          <button className="menu-item-header-action">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
        )}
      </div>
    );
  }

  if (type === 'search') {
    return (
      <div className={\`menu-item-search \${className}\`}>
        <div className="menu-item-search-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="menu-item-search-input"
        />
      </div>
    );
  }

  return (
    <div 
      className={\`menu-item \${className} \${type} \${state} \${state === 'disabled' ? 'disabled' : ''}\`}
      onClick={state !== 'disabled' ? onClick : undefined}
    >
      <div className="menu-item-content">
        {leftIcon && (
          <div className="menu-item-icon left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </div>
        )}
        
        {checkbox && (
          <div className="menu-item-checkbox">
            <input type="checkbox" />
          </div>
        )}
        
        <div className="menu-item-text">
          <span className="menu-item-label">{label}</span>
          {detail && <span className="menu-item-detail">{detail}</span>}
        </div>
        
        {rightIcon && (
          <div className="menu-item-icon right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        )}
        
        {type === 'submenu' && (
          <div className="menu-item-submenu-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

interface MenuProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  maxHeight?: number;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  className = '',
  width = 240,
  maxHeight,
}) => {
  const style = {
    width: \`\${width}px\`,
    maxHeight: maxHeight ? \`\${maxHeight}px\` : undefined,
  };

  return (
    <div className={\`menu \${className}\`} style={style}>
      {children}
    </div>
  );
};

// Usage Example:
// <Menu width={${menuWidth}}>
//   ${includeSearch ? '<MenuItem type="search" />' : ''}
//   ${includeHeaders ? '<MenuItem type="header" label="Actions" />' : ''}
//   <MenuItem label="New File"${includeIcons ? ' leftIcon' : ''} />
//   <MenuItem label="Open File"${includeIcons ? ' leftIcon' : ''} />
//   <MenuItem label="Save"${includeIcons ? ' leftIcon' : ''} />
//   ${includeDividers ? '<MenuItem type="divider" />' : ''}
//   <MenuItem label="Recent Files" type="submenu" />
//   <MenuItem label="Settings"${includeIcons ? ' rightIcon' : ''} />
//   ${includeDividers ? '<MenuItem type="divider" />' : ''}
//   <MenuItem label="Help" />
//   <MenuItem label="About" />
// </Menu>`;
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

  const menuTypes = [
    { name: 'Basic Items', items: ['New File', 'Open File', 'Save', 'Save As'] },
    { name: 'Edit Actions', items: ['Cut', 'Copy', 'Paste', 'Delete'] },
    { name: 'View Options', items: ['Zoom In', 'Zoom Out', 'Full Screen'] },
  ];

  return (
    <div className="playground">
      <h1>Menu Component Playground</h1>
      
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
              <div className="menu-demo">
                <Menu width={menuWidth}>
                  {includeSearch && <MenuItem type="search" />}
                  {includeHeaders && <MenuItem type="header" label="Cool Menu" />}
                  <MenuItem 
                    label="Models" 
                    type="submenu" 
                    submenuItems={[
                      { label: "Palmyra X 004", leftIcon: true },
                      { label: "Palmyra Fin", leftIcon: true, state: "active" },
                      { label: "Palmyra Med", leftIcon: true },
                      { label: "Palmyra Vision", leftIcon: true }
                    ]}
                  />
                  <MenuItem 
                    label="Pizza toppings" 
                    type="submenu" 
                    submenuItems={[
                      { label: "Pepperoni" },
                      { label: "Mushrooms" },
                      { label: "Sausage" },
                      { label: "Peppers" },
                      { label: "Olives" }
                    ]}
                  />
                  <MenuItem 
                    label="Cheeseburgers" 
                    type="submenu" 
                    submenuItems={[
                      { label: "Classic Burger" },
                      { label: "Bacon Cheeseburger" },
                      { label: "Mushroom Swiss" },
                      { label: "BBQ Burger" }
                    ]}
                  />
                  {includeDividers && <MenuItem type="divider" />}
                  {includeHeaders && <MenuItem type="header" label="Cuisines" />}
                  <MenuItem label="American" checkbox detail="Deep fried oreos" />
                  <MenuItem label="Mexican" checkbox detail="Tacos & tlacoyos" />
                  <MenuItem label="Italian" checkbox detail="Pizza, pasta, gnocci" />
                  <MenuItem label="French" checkbox detail="Croque Monsieur" />
                </Menu>
              </div>
              
              <div className="controls">
                <div className="control-group">
                  <label>Menu Width:</label>
                  <div className="slider-group">
                    <input
                      type="range"
                      min="200"
                      max="400"
                      value={menuWidth}
                      onChange={(e) => setMenuWidth(Number(e.target.value))}
                      className="slider"
                    />
                    <span className="slider-value">{menuWidth}px</span>
                  </div>
                </div>

                <div className="control-group">
                  <label>Features:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={includeSearch}
                        onChange={(e) => setIncludeSearch(e.target.checked)}
                      />
                      Search Bar
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={includeHeaders}
                        onChange={(e) => setIncludeHeaders(e.target.checked)}
                      />
                      Section Headers
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={includeDividers}
                        onChange={(e) => setIncludeDividers(e.target.checked)}
                      />
                      Dividers
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={includeIcons}
                        onChange={(e) => setIncludeIcons(e.target.checked)}
                      />
                      Icons
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="code-content">
              <div className="code-header">
                <span className="code-title">Complete Menu & MenuItem Components</span>
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

      {/* Component Matrix */}
      <section className="matrix-section">
        <h2>MenuItem Types & States</h2>
        <div className="menu-matrix">
          <div className="matrix-column">
            <h3>Item Types</h3>
            <Menu width={240}>
              <MenuItem type="search" />
              <MenuItem type="header" label="Section Header" />
              <MenuItem label="Regular Item" />
              <MenuItem label="With Left Icon" leftIcon />
              <MenuItem label="With Right Icon" rightIcon />
              <MenuItem 
                label="Submenu Item" 
                type="submenu" 
                submenuItems={[
                  { label: "Submenu Option 1" },
                  { label: "Submenu Option 2" },
                  { label: "Nested Submenu", type: "submenu", submenuItems: [
                    { label: "Deep Option 1" },
                    { label: "Deep Option 2" }
                  ]}
                ]}
              />
              <MenuItem label="With Checkbox" checkbox />
              <MenuItem type="divider" />
              <MenuItem label="With Detail" detail="Ctrl+N" />
            </Menu>
          </div>
          
          <div className="matrix-column">
            <h3>Item States</h3>
            <Menu width={240}>
              <MenuItem label="Default State" state="default" />
              <MenuItem label="Hover State" state="hover" />
              <MenuItem label="Active State" state="active" />
              <MenuItem label="Disabled State" state="disabled" />
            </Menu>
          </div>
          
          <div className="matrix-column">
            <h3>Menu Variations</h3>
            <Menu width={200}>
              <MenuItem label="Compact Menu" />
              <MenuItem label="Item 2" />
              <MenuItem label="Item 3" />
            </Menu>
            <br />
            <Menu width={300}>
              <MenuItem type="search" />
              <MenuItem type="header" label="Wide Menu" />
              <MenuItem label="Extended width item" detail="Details" />
              <MenuItem label="Another item" leftIcon rightIcon />
            </Menu>
          </div>
        </div>
      </section>

      <div className="playground-info">
        <h3>Menu Component Features:</h3>
        <ul>
          <li>Multiple item types: regular, search, header, divider, submenu</li>
          <li>Interactive states: default, hover, active, disabled</li>
          <li>Icon support: left icons, right icons, submenu arrows</li>
          <li>Flexible width and height options</li>
          <li>Search functionality with built-in input</li>
          <li>Section headers with optional actions</li>
          <li>Checkbox support for multi-select scenarios</li>
          <li>Detail text for shortcuts and descriptions</li>
          <li>Smooth hover and focus transitions</li>
          <li>Accessible keyboard navigation</li>
        </ul>
      </div>
    </div>
  );
}; 