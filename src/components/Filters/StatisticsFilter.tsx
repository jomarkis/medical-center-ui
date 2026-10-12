import React, { useState } from "react";
import "../CreateMenus/CreateMenu.css";
import RangeSlider from "../RangeSlider";

export interface StatisticsFilters {
  patientID?: number | null;
  examID?: number | null;
  category?: string | null;
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
  const [patientID, setPatientID] = useState<number | null>(null);
  const [examID, setExamID] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [incomeRange, setIncomeRange] = useState<number[]>([0, maxLimit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      patientID: type === "patient" ? patientID : undefined,
      examID: type === "exam" ? examID : undefined,
      category: type === "category" ? category : undefined,
      minIncome: incomeRange[0],
      maxIncome: incomeRange[1],
    });
  };

  const renderIdentifierInput = () => {
    switch (type) {
      case "patient":
        return (
          <div className="form-group">
            <label htmlFor="patientID">Patient ID</label>
            <input
              type="number"
              id="patientID"
              placeholder="e.g. 1"
              value={patientID ?? ""}
              onChange={(e) =>
                setPatientID(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
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
              placeholder="e.g. 1"
              value={examID ?? ""}
              onChange={(e) =>
                setExamID(e.target.value === "" ? null : Number(e.target.value))
              }
              disabled={isLoading}
            />
          </div>
        );

      case "category":
        return (
          <div className="form-group">
            <label htmlFor="category">Exam Category</label>
            <select
              id="category"
              className="form-select"
              value={category ?? ""}
              onChange={(e) => setCategory(e.target.value || null)}
              disabled={isLoading}
            >
              <option value="">All Categories</option>
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
        {renderIdentifierInput()}

        <div className="form-group">
          <RangeSlider
            label="Income"
            min={0}
            max={maxLimit}
            value={incomeRange}
            onChange={(newValue) => setIncomeRange(newValue)}
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
