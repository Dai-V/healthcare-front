import React, { useState } from 'react';
import { User, Home, Settings } from 'lucide-react';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navBarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 231, 235, 0.95)',
    borderRadius: '25px',
    padding: '12px 24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    gap: '32px',
    width: 'fit-content'
  };

  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    color: '#3A5FCF'
  };

  const activeIconButtonStyle = {
    ...iconButtonStyle,
    backgroundColor: 'rgba(67, 56, 202, 0.1)',
    transform: 'scale(1.1)'
  };

  const containerStyle = {
    position:'absolute',
    zIndex:'10',
    paddingTop:'40px',
    right:'50%',
  };

  return (
    <div style={containerStyle}>
      <nav style={navBarStyle}>
        <button
          style={activeTab === 'user' ? activeIconButtonStyle : iconButtonStyle}
          onClick={() => setActiveTab('user')}
          onMouseEnter={(e) => {
            if (activeTab !== 'user') {
              e.target.style.backgroundColor = 'rgba(67, 56, 202, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'user') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <User size={24} />
        </button>

        <button
          style={activeTab === 'home' ? activeIconButtonStyle : iconButtonStyle}
          onClick={() => setActiveTab('home')}
          onMouseEnter={(e) => {
            if (activeTab !== 'home') {
              e.target.style.backgroundColor = 'rgba(67, 56, 202, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'home') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Home size={24} />
        </button>

        <button
          style={activeTab === 'settings' ? activeIconButtonStyle : iconButtonStyle}
          onClick={() => setActiveTab('settings')}
          onMouseEnter={(e) => {
            if (activeTab !== 'settings') {
              e.target.style.backgroundColor = 'rgba(67, 56, 202, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'settings') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Settings size={24} />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;