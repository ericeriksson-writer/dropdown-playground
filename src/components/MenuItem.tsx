import React, { useState, useRef, useEffect } from 'react';
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
  submenuItems?: MenuItemProps[];
  onSubmenuOpen?: (items: MenuItemProps[], label: string) => void;
  onSubmenuClose?: () => void;
  isSubmenuParent?: boolean;
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
  submenuItems = [],
  onSubmenuOpen,
  onSubmenuClose,
  isSubmenuParent = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmenuClick = () => {
    if (type === 'submenu' && onSubmenuOpen && submenuItems.length > 0) {
      onSubmenuOpen(submenuItems, label);
    } else if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (type === 'submenu' && onSubmenuOpen && submenuItems.length > 0) {
      onSubmenuOpen(submenuItems, label);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (type === 'submenu' && onSubmenuClose) {
      onSubmenuClose();
    }
  };

  if (type === 'divider') {
    return <div className={`menu-item-divider ${className}`} />;
  }

  if (type === 'header' || type === 'header-multiselect') {
    return (
      <div className={`menu-item-header ${className} ${type}`}>
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
      <div className={`menu-item-search ${className}`}>
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
      className={`menu-item ${className} ${type} ${state} ${state === 'disabled' ? 'disabled' : ''} ${isSubmenuParent ? 'submenu-parent' : ''}`}
      onClick={state !== 'disabled' ? handleSubmenuClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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