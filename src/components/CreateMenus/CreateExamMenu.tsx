import React, { useState } from "react";
import "./CreateMenu.css";

export interface CreateExamData {
  examName: string;
  examCategory: string;
  maxSlotsPerDay: number;
  cost: number;
  doctorID: number;
}

export interface CreateIMAGINGExamData extends CreateExamData {
  machineType: string;
}

export interface CreateMICROBIOLOGICALExamData extends CreateExamData {
  sampleType: string;
}

export interface CreateSPECIALIZEDExamData extends CreateExamData {
  examSpecialty: string;
}

interface CreateExamMenuProps {
  onSubmit: (data: CreateExamData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function CreateExamMenu({
  onSubmit,
  onCancel,
  isLoading = false,
  errorMessage = null,
}: CreateExamMenuProps) {
  const [formData, setFormData] = useState<CreateExamData>({
    examName: "",
    examCategory: "IMAGING",
    maxSlotsPerDay: 0,
    cost: 0,
    doctorID: 0,
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
      !formData.examName.trim() ||
      !formData.examCategory.trim() ||
      !formData.maxSlotsPerDay.toString().trim() ||
      formData.cost <= 0 ||
      formData.doctorID <= 0
    ) {
      setValidationError("Please fill in all fields.");
      return;
    }

    onSubmit(formData);
  };

  const activeError = validationError || errorMessage;

  const [activeType, setActiveType] = useState<string>("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      examCategory: value,
    }));
    setActiveType(value);
  };

  const renderTypeExtraForm = () => {
    if (formData.examCategory === "IMAGING") {
      return (
        <div className="form-group">
          <label htmlFor="machineType">Machine Type</label>
          <input
            type="text"
            id="machineType"
            name="machineType"
            placeholder="e.g. MRI"
            value={(formData as CreateIMAGINGExamData).machineType || ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      );
    }
    if (formData.examCategory === "MICROBIOLOGICAL") {
      return (
        <div className="form-group">
          <label htmlFor="sampleType">Sample Type</label>
          <input
            type="text"
            id="sampleType"
            name="sampleType"
            placeholder="e.g. Blood"
            value={(formData as CreateMICROBIOLOGICALExamData).sampleType || ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      );
    }
    if (formData.examCategory === "SPECIALIZED") {
      return (
        <div className="form-group">
          <label htmlFor="examSpecialty">Exam Specialty</label>
          <input
            type="text"
            id="examSpecialty"
            name="examSpecialty"
            placeholder="e.g. Cardiology"
            value={(formData as CreateSPECIALIZEDExamData).examSpecialty || ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      );
    }
  };

  return (
    <div className="create-card">
      <h3 className="create-title">Register New Exam</h3>

      {activeError && <div className="form-alert error">{activeError}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="examName">Exam Name</label>
          <input
            type="text"
            id="examName"
            name="examName"
            placeholder="e.g. John's Blood Test"
            value={formData.examName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxSlotsPerDay">Max Slots Per Day</label>
          <input
            type="text"
            id="maxSlotsPerDay"
            name="maxSlotsPerDay"
            placeholder="e.g. 5"
            value={formData.maxSlotsPerDay}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            id="cost"
            name="cost"
            placeholder="e.g. 24.99"
            value={formData.cost}
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
            placeholder="e.g. 3"
            value={formData.doctorID}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="examCategory">Exam Category</label>
          <select
            id="examCategory"
            name="examCategory"
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
        {activeType !== "" && renderTypeExtraForm()}
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
