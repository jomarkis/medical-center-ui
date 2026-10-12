import React from "react";
import "./Table.css";

export interface IncomeRecord {
  patientID?: number;
  examID?: number;
  category?: string;
  totalIncome: number;
  totalAppointments: number;
}

interface IncomeTableProps {
  statistics: IncomeRecord[];
  type: "patient" | "exam" | "category";
}

export default function IncomeTable({ statistics, type }: IncomeTableProps) {
  const getIdentifierHeader = () => {
    switch (type) {
      case "patient":
        return "Patient ID";
      case "exam":
        return "Exam ID";
      case "category":
        return "Category";
    }
  };

  const getIdentifierValue = (stat: IncomeRecord) => {
    switch (type) {
      case "patient":
        return stat.patientID ?? "-";
      case "exam":
        return stat.examID ?? "-";
      case "category":
        return stat.category ?? "-";
    }
  };

  return (
    <div className="table-wrapper">
      <table className="custom-dark-table">
        <thead>
          <tr>
            <th className="align-left">{getIdentifierHeader()}</th>
            <th className="align-left">Total Income (€)</th>
            <th className="align-left">Total Appointments</th>
          </tr>
        </thead>
        <tbody>
          {statistics.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-table-cell">
                No statistics found.
              </td>
            </tr>
          ) : (
            statistics.map((stat, idx) => (
              <tr key={idx}>
                <td className="align-left">{getIdentifierValue(stat)}</td>
                <td className="align-left">{stat.totalIncome}</td>
                <td className="align-left">{stat.totalAppointments}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
