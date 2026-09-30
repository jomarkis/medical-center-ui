import React, { useState } from "react";
import "./App.css";

interface AdminPageProps {
  onLogout: () => void;
}

function AdminPage({ onLogout }: AdminPageProps) {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the admin page!</p>
      <button onClick={onLogout} className="btn-logout">
        Logout
      </button>
    </div>
  );
}

export default AdminPage;
