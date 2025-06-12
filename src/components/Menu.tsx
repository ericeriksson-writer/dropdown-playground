import React, { useState, useRef, useCallback } from 'react';
import { MenuItem } from './MenuItem';
import './Menu.css';

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
}

interface MenuProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  maxHeight?: number;
  showSubmenuPanel?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  className = '',
  width = 240,
  maxHeight,
  showSubmenuPanel = true,
}) => {
  const [submenuData, setSubmenuData] = useState<{
    items: MenuItemProps[];
    title: string;
  } | null>(null);
  
  const closeTimeoutRef = useRef<number | null>(null);

  const handleSubmenuOpen = useCallback((items: MenuItemProps[], title: string) => {
    if (showSubmenuPanel) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setSubmenuData({ items, title });
    }
  }, [showSubmenuPanel]);

  const handleSubmenuClose = useCallback(() => {
    // Add a small delay before closing to allow mouse movement between elements
    closeTimeoutRef.current = setTimeout(() => {
      setSubmenuData(null);
    }, 100);
  }, []);

  const handleSubmenuMouseEnter = useCallback(() => {
    // Cancel close timeout when mouse enters submenu
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleSubmenuMouseLeave = useCallback(() => {
    // Close submenu when mouse leaves submenu panel
    handleSubmenuClose();
  }, [handleSubmenuClose]);

  const style = {
    width: `${width}px`,
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
  };

  // Clone children and add submenu handlers
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === MenuItem) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onSubmenuOpen: handleSubmenuOpen,
        onSubmenuClose: handleSubmenuClose,
        isSubmenuParent: submenuData?.title === child.props.label,
      });
    }
    return child;
  });

  return (
    <div className="menu-container">
      <div 
        className={`menu ${className}`} 
        style={style}
      >
        {enhancedChildren}
      </div>
      
      {/* Submenu Panel */}
      {showSubmenuPanel && submenuData && (
        <div 
          className="submenu-panel"
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          <div className="submenu-header">
            <span className="submenu-title">{submenuData.title.toUpperCase()}</span>
          </div>
          <div className="submenu-content">
            {submenuData.items.map((item, index) => (
              <MenuItem
                key={index}
                {...item}
                className={`submenu-item ${item.className || ''}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage component for demonstration
export const ExampleMenu: React.FC = () => {
  return (
    <Menu>
      <MenuItem type="search" />
      <MenuItem type="header" label="Actions" />
      <MenuItem label="New File" leftIcon />
      <MenuItem label="Open File" leftIcon />
      <MenuItem label="Save" leftIcon />
      <MenuItem type="divider" />
      <MenuItem 
        label="Recent Files" 
        type="submenu" 
        submenuItems={[
          { label: "document.pdf", detail: "2 hours ago" },
          { label: "presentation.pptx", detail: "Yesterday" },
          { label: "spreadsheet.xlsx", detail: "3 days ago" },
          { type: "divider" },
          { label: "Clear Recent Files" }
        ]}
      />
      <MenuItem label="Settings" rightIcon />
      <MenuItem type="divider" />
      <MenuItem label="Help" />
      <MenuItem label="About" />
    </Menu>
  );
}; 