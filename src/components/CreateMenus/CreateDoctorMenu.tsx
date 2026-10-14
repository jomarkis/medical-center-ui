import React, { useState } from "react";
import "./CreateMenu.css";

export interface CreateDoctorData {
  doctorName: string;
  doctorPhone: string;
  specialty: string;
  years: number;
}

interface CreateDoctorMenuProps {
  onSubmit: (data: CreateDoctorData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function CreateDoctorMenu({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
}: CreateDoctorMenuProps) {
  const [formData, setFormData] = useState<CreateDoctorData>({
    doctorName: "",
    doctorPhone: "",
    specialty: "",
    years: 0,
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
      !formData.doctorName.trim() ||
      !formData.doctorPhone.trim() ||
      !formData.specialty.trim() ||
      formData.years <= 0
    ) {
      setValidationError("Please fill in all fields.");
      return;
    }

    onSubmit(formData);
  };

  const activeError = validationError || errorMessage;

  return (
    <div className="create-card">
      <h3 className="create-title">Register New Doctor</h3>

      {activeError && <div className="form-alert error">{activeError}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="doctorName">Full Name</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            placeholder="e.g. John Doe"
            value={formData.doctorName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="doctorPhone">Phone Number</label>
          <input
            type="text"
            id="doctorPhone"
            name="doctorPhone"
            placeholder="e.g. 6901234567"
            value={formData.doctorPhone}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            placeholder="e.g. Cardiology"
            value={formData.specialty}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="years">Years of Experience</label>
          <input
            type="number"
            id="years"
            name="years"
            placeholder="e.g. 5"
            value={formData.years}
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
