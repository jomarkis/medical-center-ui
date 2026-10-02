import React from "react";
import "./PatientsTable.css";

export interface PatientRecord {
  patientID: string;
  patientName: string;
  patientPhone: string;
  email: string;
}

interface PatientsTableProps {
  patients: PatientRecord[];
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  return (
    <div className="table-wrapper">
      <table className="custom-dark-table">
        <thead>
          <tr>
            <th className="align-left">Patient ID</th>
            <th className="align-left">Patient Name</th>
            <th className="align-left">Patient Phone</th>
            <th className="align-right">Email</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-table-cell">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.patientID}>
                <td className="patient-id-cell align-left">
                  {patient.patientID}
                </td>
                <td className="align-left">{patient.patientName}</td>
                <td className="align-left">{patient.patientPhone}</td>
                <td className="align-right email-cell">{patient.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
