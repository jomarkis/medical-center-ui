import React, { useState } from "react";
import "./App.css";

interface PatientPageProps {
  onLogout: () => void;
}

function PatientPage({ onLogout }: PatientPageProps) {
  return (
    <div>
      <h1>Patient Page</h1>
      <p>Welcome to the patient page!</p>
      <button onClick={onLogout} className="btn-logout">
        Logout
      </button>
    </div>
  );
}

export default PatientPage;

//
