import React, { useState } from "react";
import "../CreateMenus/CreateMenu.css";
import RangeSlider from "../RangeSlider";

export interface StatisticsFilters {
  per: number | string | null;
  minIncome: number | null;
  maxIncome: number | null;
}

interface StatisticsFilterProps {
  onSubmit: (data: StatisticsFilters) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
  maxLimit: number;
  type: "patient" | "exam" | "category";
}

export default function StatisticsFilter({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
  maxLimit,
  type,
}: StatisticsFilterProps) {
  const [formData, setFormData] = useState<StatisticsFilters>({
    per: null,
    minIncome: null,
    maxIncome: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      per: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderLabel = () => {
    switch (type) {
      case "patient":
        return (
          <div className="form-group">
            <label htmlFor="patientID">Patient ID</label>
            <input
              type="number"
              id="patientID"
              name="per"
              placeholder="e.g. 1"
              value={formData.per ?? ""}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        );
      case "exam":
        return (
          <div className="form-group">
            <label htmlFor="examID">Exam ID</label>
            <input
              type="number"
              id="examID"
              name="per"
              placeholder="e.g. 1"
              value={formData.per ?? ""}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        );
      case "category":
        return (
          <div className="form-group">
            <label htmlFor="examType">Exam Type</label>
            <select
              id="examType"
              name="examType"
              className="form-select"
              defaultValue=""
              onChange={handleTypeChange}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="IMAGING">IMAGING</option>
              <option value="MICROBIOLOGICAL">MICROBIOLOGICAL</option>
              <option value="SPECIALIZED">SPECIALIZED</option>
            </select>
          </div>
        );
    }
  };

  return (
    <div className="create-card">
      <h3 className="create-title">
        Income Per {type.charAt(0).toUpperCase() + type.slice(1)} Search Filter
      </h3>

      {errorMessage && <div className="form-alert error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        {renderLabel()}
        <div className="form-group">
          <RangeSlider
            label="Income"
            min={0}
            max={maxLimit}
            value={[formData.minIncome || 0, formData.maxIncome || maxLimit]}
            onChange={(newValue) => {
              setFormData((prev) => ({
                ...prev,
                minIncome: newValue[0],
                maxIncome: newValue[1],
              }));
            }}
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
            {isLoading ? "Loading statistics..." : "View Statistics"}
          </button>
        </div>
      </form>
    </div>
  );
}
