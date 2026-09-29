import { useState } from 'react'
import './Login.css'

interface LoginProps {
  onSelectRole: (role: 'PATIENT' | 'DOCTOR' | 'ADMIN') => void;
}

function Login({ onSelectRole }: LoginProps) {
    return (
      <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Medical Center</h2>
        <p className="login-subtitle">Select your role to login</p>

        <div className="role-buttons">
          <button 
            className="btn-role btn-patient"
            onClick={() => onSelectRole('PATIENT')}       >
            👤 Login as Patient
          </button>

          <button 
            className="btn-role btn-doctor"          
            onClick={() => onSelectRole('DOCTOR')}>
            🩺 Login as Doctor
          </button>

          <button 
            className="btn-role btn-admin"          
            onClick={() => onSelectRole('ADMIN')}>
            ⚙️ Login as Admin
          </button>
        </div>
      </div>
    </div>
    )
}
export default Login