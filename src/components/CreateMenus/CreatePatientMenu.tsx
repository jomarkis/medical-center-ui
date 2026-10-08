import React, { useState } from "react";
import "./CreateMenu.css";

export interface CreatePatientData {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
}

interface CreatePatientMenuProps {
  onSubmit: (data: CreatePatientData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function CreatePatientMenu({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
}: CreatePatientMenuProps) {
  const [formData, setFormData] = useState<CreatePatientData>({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (
      !formData.patientName.trim() ||
      !formData.patientPhone.trim() ||
      !formData.patientEmail.trim()
    ) {
      setValidationError("Please fill in all fields.");
      return;
    }

    onSubmit(formData);
  };

  const activeError = validationError || errorMessage;

  return (
    <div className="create-card">
      <h3 className="create-title">Register New Patient</h3>

      {activeError && <div className="form-alert error">{activeError}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="patientName">Full Name</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            placeholder="e.g. John Doe"
            value={formData.patientName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="patientPhone">Phone Number</label>
          <input
            type="text"
            id="patientPhone"
            name="patientPhone"
            placeholder="e.g. 6901234567"
            value={formData.patientPhone}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="patientEmail">Email Address</label>
          <input
            type="email"
            id="patientEmail"
            name="patientEmail"
            placeholder="e.g. patient@example.com"
            value={formData.patientEmail}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button type="submit" className="btn-create" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

//
