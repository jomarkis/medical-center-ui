import React from "react";
import "./Table.css";

export interface DoctorRecord {
  doctorID: string;
  doctorName: string;
  doctorPhone: string;
  specialty: string;
  years: number;
}

interface DoctorsTableProps {
  doctors: DoctorRecord[];
}

export default function DoctorsTable({ doctors }: DoctorsTableProps) {
  return (
    <div className="table-wrapper">
      <table className="custom-dark-table">
        <thead>
          <tr>
            <th className="align-left">Doctor ID</th>
            <th className="align-left">Doctor Name</th>
            <th className="align-left">Doctor Phone</th>
            <th className="align-left">Specialty</th>
            <th className="align-right">Years</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-table-cell">
                No doctors found.
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <tr key={doctor.doctorID}>
                <td className="doctor-id-cell align-left">{doctor.doctorID}</td>
                <td className="align-left">{doctor.doctorName}</td>
                <td className="align-left">{doctor.doctorPhone}</td>
                <td className="align-right">{doctor.specialty}</td>
                <td className="align-right">{doctor.years}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
