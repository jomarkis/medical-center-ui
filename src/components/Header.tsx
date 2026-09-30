import React from 'react';
import './Header.css'; // Τοπικό CSS του component
import logo from '../assets/logo.png'; // Εισαγωγή του λογοτύπου από τα assets

interface HeaderProps {
  roleTitle: 'Admin' | 'Doctor' | 'Patient';
  onLogout: () => void;
  themeColor?: string;
}

function Header({ roleTitle, onLogout, themeColor = '#e53e3e' }: HeaderProps) {
  return (
    <header className="app-header" style={{ backgroundColor: themeColor }}>
      <div className="header-brand">
        <img src={logo} alt="Medical Center Logo" className="brand-logo" />
        <span className="brand-title">Medical Center</span>
        <span className="brand-badge">{roleTitle}</span>
      </div>

      <button onClick={onLogout} className="header-btn-logout">
        <span>Logout</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </header>
  );
}

export default Header;