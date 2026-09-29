import React, { useState } from 'react';
import './Login.css';

interface Login2Props {
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  onBack: () => void;
  onSumbitSuccess: () => void;
}

function Login2({ role, onBack, onSumbitSuccess }: Login2Props) {
  const [identifier, setIdentifier] = useState('');

  const identifierLabel = 
    role === 'PATIENT' ? 'Patient ID' : 
    role === 'DOCTOR' ? 'Doctor ID' : 
    'Admin Password';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitting ${role} identifier:`, identifier);
    onSumbitSuccess();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Κουμπί επιστροφής */}
        <div style={{ textAlign: 'left', marginBottom: '0.8rem' }}>
          <button type="button" onClick={onBack} className="btn-back">
            ← Back
          </button>
        </div>

        {/* Δυναμικός χαιρετισμός */}
        <h2 className="login-title">Hello dear {role}!</h2>
        <p className="login-subtitle">Please enter your credentials below</p>

        {/* Φόρμα με onSubmit */}
        <form onSubmit={handleSubmit} className="role-buttons">
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#4a5568' }}>
              Enter your {identifierLabel}:
            </label>
            <input
              type={role === 'ADMIN' ? 'password' : 'text'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder={role === 'ADMIN' ? '************' : `0`}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e0',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            className={`btn-role ${role === 'PATIENT' ? 'btn-patient' : role === 'DOCTOR' ? 'btn-doctor' : 'btn-admin'}`}
            style={{ marginTop: '0.5rem' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login2;