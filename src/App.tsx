import { useState } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Login2 from "./pages/auth/Login2";
import AdminPage from "./pages/dashboards/AdminPage";
import PatientPage from "./pages/dashboards/PatientPage";
import DoctorPage from "./pages/dashboards/DoctorPage";

function App() {
  const [selectedRole, setSelectedRole] = useState<
    "PATIENT" | "DOCTOR" | "ADMIN" | null
  >(null);

  const [activeRole, setActiveRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });

  const handleLoginSuccess = () => {
    const savedRole = localStorage.getItem("userRole");
    setActiveRole(savedRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setActiveRole(null);
    setSelectedRole(null);
  };

  if (activeRole === "ROLE_ADMIN") {
    return <AdminPage onLogout={handleLogout} />;
  }
  if (activeRole === "ROLE_DOCTOR") {
    return <DoctorPage onLogout={handleLogout} />;
  }
  if (activeRole === "ROLE_PATIENT") {
    return <PatientPage onLogout={handleLogout} />;
  }

  if (selectedRole === null) {
    return <Login onSelectRole={(role) => setSelectedRole(role)} />;
  }

  return (
    <Login2
      role={selectedRole}
      onBack={() => setSelectedRole(null)}
      onSumbitSuccess={handleLoginSuccess}
    />
  );
}

export default App;
