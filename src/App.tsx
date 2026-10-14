import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Login2 from "./pages/auth/Login2";
import AdminPage from "./pages/dashboards/AdminPage";
import PatientPage from "./pages/dashboards/PatientPage";
import DoctorPage from "./pages/dashboards/DoctorPage";
import axios from "axios";

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

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          activeRole !== null
        ) {
          handleLogout();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [activeRole]);

  useEffect(() => {
    if (!activeRole) return;

    const token = localStorage.getItem("token");
    if (!token) {
      handleLogout();
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      if (!payload.exp) return;

      const expirationTimeMs = payload.exp * 1000;
      const timeRemaining = expirationTimeMs - Date.now();

      if (timeRemaining <= 0) {
        handleLogout();
      } else {
        const timer = setTimeout(() => {
          handleLogout();
        }, timeRemaining);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error("Failed to parse token expiration:", e);
      handleLogout();
    }
  }, [activeRole]);

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
