import React from "react";
import "./Table.css";

export interface ΙncomeRecord {
  per: number | string;
  totalIncome: number;
  totalAppointments: number;
}

interface IncomeTableProps {
  statistics: ΙncomeRecord[];
  type: "patient" | "exam" | "category";
}

const renderTableHeader = (type: "patient" | "exam" | "category") => {
  switch (type) {
    case "patient":
      return (
        <tr>
          <th className="align-left">Patient ID</th>
          <th className="align-left">Patient's Total Income</th>
          <th className="align-left">Patient's Total Appointments</th>
        </tr>
      );
    case "exam":
      return (
        <tr>
          <th className="align-left">Exam ID</th>
          <th className="align-left">Exam's Total Income</th>
          <th className="align-left">Exam's Total Appointments</th>
        </tr>
      );
    case "category":
      return (
        <tr>
          <th className="align-left">Exam Category</th>
          <th className="align-left">Category's Total Income</th>
          <th className="align-right">Category Total Appointments</th>
        </tr>
      );
  }
};

export default function IncomeTable({ statistics, type }: IncomeTableProps) {
  return (
    <div className="table-wrapper">
      <table className="custom-dark-table">
        <thead>{renderTableHeader(type)}</thead>
        <tbody>
          {statistics.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-table-cell">
                No statistics found.
              </td>
            </tr>
          ) : (
            statistics.map((stat) => (
              <tr key={stat.per}>
                <td className="patient-id-cell align-left">{stat.per}</td>
                <td className="align-left">{stat.totalIncome}</td>
                <td className="align-right">{stat.totalAppointments}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
