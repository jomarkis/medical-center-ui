import React, { useState } from "react";
import "./App.css";

interface DoctorPageProps {
  onLogout: () => void;
}

function DoctorPage({ onLogout }: DoctorPageProps) {
  return (
    <div>
      <h1>Doctor Page</h1>
      <p>Welcome to the doctor page!</p>
      <button onClick={onLogout} className="btn-logout">
        Logout
      </button>
    </div>
  );
}

export default DoctorPage;
