import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import type {
  LoginRequest,
  AdminLoginRequest,
  DoctorLoginRequest,
  PatientLoginRequest,
  LoginResponse,
} from "../../types/auth";

interface Login2Props {
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  onBack: () => void;
  onSumbitSuccess: () => void;
}

function Login2({ role, onBack, onSumbitSuccess }: Login2Props) {
  const [identifier, setIdentifier] = useState("");
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const identifierLabel =
    role === "PATIENT"
      ? "Patient ID"
      : role === "DOCTOR"
        ? "Doctor ID"
        : "Admin Password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitting ${role} identifier:`, identifier);

    let payload: LoginRequest;

    if (role === "ADMIN") {
      const adminPayload: AdminLoginRequest = {
        role: "ADMIN",
        pin: identifier,
      };
      payload = adminPayload;
    } else if (role === "DOCTOR") {
      const doctorPayload: DoctorLoginRequest = {
        role: "DOCTOR",
        doctorID: Number(identifier),
      };
      payload = doctorPayload;
    } else {
      const patientPayload: PatientLoginRequest = {
        role: "PATIENT",
        patientID: Number(identifier),
      };
      payload = patientPayload;
    }

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8081/api/auth/login",
        payload,
      );

      const { token, role, identifier } = response.data;
      console.log(`Συνδέθηκε ο ρόλος: ${role} με ID: ${identifier}`);

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", identifier.toString());

      setLoginMessage("Successful login!");
      onSumbitSuccess();
    } catch (err: any) {
      if (err.response && err.response.data) {
        setLoginMessage(
          err.response.data.message || "Failed to login. Please try again.",
        );
      } else {
        setLoginMessage("No response from server.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: "left", marginBottom: "0.8rem" }}>
          <button type="button" onClick={onBack} className="btn-back">
            ← Back
          </button>
        </div>

        <h2 className="login-title">Hello dear {role}!</h2>
        <p className="login-subtitle">Please enter your credentials below</p>

        <form onSubmit={handleSubmit} className="role-buttons">
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#4a5568",
              }}
            >
              Enter your {identifierLabel}:
            </label>
            <input
              type={role === "ADMIN" ? "password" : "text"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder={role === "ADMIN" ? "************" : `0`}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e0",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            className={`btn-role ${role === "PATIENT" ? "btn-patient" : role === "DOCTOR" ? "btn-doctor" : "btn-admin"}`}
            style={{ marginTop: "0.5rem" }}
          >
            Login
          </button>
          {loginMessage && (
            <p
              style={{
                color:
                  loginMessage === "Successful login!" ? "#38a169" : "#e53e3e",
                textDecoration: "underline",
                fontSize: "0.9rem",
                fontWeight: 600,
                marginTop: "0.8rem",
                textAlign: "center",
              }}
            >
              {loginMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login2;
