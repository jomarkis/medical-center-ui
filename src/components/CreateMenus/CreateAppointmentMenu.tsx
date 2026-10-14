import React, { useState } from "react";
import "./CreateMenu.css";
import BasicDatePicker from "../BasicDatePicker";

export interface CreateAppointmentData {
  patientID: number;
  examID: number;
  date: string;
  fastResults: boolean;
}

interface CreateAppointmentMenuProps {
  onSubmit: (data: CreateAppointmentData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function CreateAppointmentMenu({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
}: CreateAppointmentMenuProps) {
  const [formData, setFormData] = useState<CreateAppointmentData>({
    patientID: 0,
    examID: 0,
    date: "",
    fastResults: false,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      date: value ?? "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (
      !formData.patientID.toString().trim() ||
      !formData.examID.toString().trim() ||
      !formData.date.trim() ||
      formData.fastResults === undefined
    ) {
      setValidationError("Please fill in all fields.");
      return;
    }

    onSubmit(formData);
  };

  const activeError = validationError || errorMessage;

  return (
    <div className="create-card">
      <h3 className="create-title">Register New Appointment</h3>

      {activeError && <div className="form-alert error">{activeError}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="patientID">Patient ID</label>
          <input
            type="number"
            id="patientID"
            name="patientID"
            placeholder="e.g. 1"
            value={formData.patientID}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="examID">Exam ID</label>
          <input
            type="number"
            id="examID"
            name="examID"
            placeholder="e.g. 1"
            value={formData.examID}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <BasicDatePicker
            label="Appointment Date"
            value={formData.date}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </div>

        <div className="form-group form-group-checkbox">
          <label htmlFor="fastResults">Fast Results</label>
          <input
            type="checkbox"
            id="fastResults"
            name="fastResults"
            className="checkbox-input"
            checked={formData.fastResults}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fastResults: e.target.checked,
              }))
            }
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
