import React, { useState } from "react";
import "./CreateMenus/CreateMenu.css";

export interface DeleteAppointmentData {
  appointmentID: number;
}

interface DeleteAppointmentMenuProps {
  onSubmit: (data: DeleteAppointmentData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
}

export default function DeleteAppointmentMenu({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
  successMessage = null,
}: DeleteAppointmentMenuProps) {
  const [formData, setFormData] = useState<DeleteAppointmentData>({
    appointmentID: 0,
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

    if (formData.appointmentID <= 0) {
      setValidationError("Please fill in all fields.");
      return;
    }

    onSubmit(formData);
  };

  const activeError = validationError || errorMessage;

  return (
    <div className="create-card">
      <h3 className="create-title">Delete Appointment</h3>

      {activeError ? (
        <div className="form-alert error">{activeError}</div>
      ) : (
        successMessage && (
          <div className="form-alert success">{successMessage}</div>
        )
      )}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="appointmentID">Appointment ID</label>
          <input
            type="number"
            id="appointmentID"
            name="appointmentID"
            placeholder="e.g. 1"
            value={formData.appointmentID}
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
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}
