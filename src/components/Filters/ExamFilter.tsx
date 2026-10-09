import React, { useState } from "react";
import "../CreateMenus/CreateMenu.css";

export interface ExamFilters {
  doctorID: number | null;
}

interface ExamFilterProps {
  onSubmit: (data: ExamFilters) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function ExamFilter({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
}: ExamFilterProps) {
  const [formData, setFormData] = useState<ExamFilters>({ doctorID: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="create-card">
      <h3 className="create-title">Exams Search Filter</h3>

      {errorMessage && <div className="form-alert error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="create-form">
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
            {isLoading ? "Loading exams..." : "View Exams"}
          </button>
        </div>
      </form>
    </div>
  );
}
