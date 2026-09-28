import { useState } from 'react'
import './Login.css'

function Login() {
    return (
      <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Medical Center</h2>
        <p className="login-subtitle">Select your role to login</p>

        <div className="role-buttons">
          <button 
            className="btn-role btn-patient"          >
            👤 Login as Patient
          </button>

          <button 
            className="btn-role btn-doctor"          >
            🩺 Login as Doctor
          </button>

          <button 
            className="btn-role btn-admin"          >
            ⚙️ Login as Admin
          </button>
        </div>
      </div>
    </div>
    )
}
export default Login