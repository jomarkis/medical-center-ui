import React, { useState } from "react";
import "../CreateMenus/CreateMenu.css";
import BasicDatePicker from "../BasicDatePicker";

export interface AppointmentFilters {
  examID: number | null;
  patientID: number | null;
  doctorID: number | null;
  date: string | null;
}

interface AppointmentFilterProps {
  onSubmit: (data: AppointmentFilters) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function AppointmentFilter({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
}: AppointmentFilterProps) {
  const [formData, setFormData] = useState<AppointmentFilters>({
    examID: null,
    patientID: null,
    doctorID: null,
    date: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  const handleDateChange = (value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="create-card">
      <h3 className="create-title">Appointments Search Filter</h3>

      {errorMessage && <div className="form-alert error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="examID">Exam ID</label>
          <input
            type="number"
            id="examID"
            name="examID"
            placeholder="e.g. 1"
            value={formData.examID ?? ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientID">Patient ID</label>
          <input
            type="number"
            id="patientID"
            name="patientID"
            placeholder="e.g. 1"
            value={formData.patientID ?? ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorID">Doctor ID</label>
          <input
            type="number"
            id="doctorID"
            name="doctorID"
            placeholder="e.g. 1"
            value={formData.doctorID ?? ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          {BasicDatePicker(
            "Appointment Date",
            formData.date,
            handleDateChange as () => void,
            "YYYY-MM-DD",
          )}
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
            {isLoading ? "Loading appointments..." : "View Appointments"}
          </button>
        </div>
      </form>
    </div>
  );
}
