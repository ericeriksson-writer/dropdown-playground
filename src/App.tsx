import React, { useState } from 'react';
import { DropdownPlayground } from './components/DropdownPlayground';
import { MenuPlayground } from './components/MenuPlayground';
import './App.css';

type ComponentType = 'dropdown' | 'menu';

export const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('dropdown');

  const components = [
    { id: 'dropdown' as ComponentType, name: 'Dropdown', component: DropdownPlayground },
    { id: 'menu' as ComponentType, name: 'Menu', component: MenuPlayground },
  ];

  const ActiveComponent = components.find(c => c.id === activeComponent)?.component || DropdownPlayground;

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-content">
          <h1 className="nav-title">Component Playground</h1>
          <div className="nav-links">
            {components.map((component) => (
              <button
                key={component.id}
                className={`nav-link ${activeComponent === component.id ? 'active' : ''}`}
                onClick={() => setActiveComponent(component.id)}
              >
                {component.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="app-main">
        <ActiveComponent />
      </main>
    </div>
  );
}; 