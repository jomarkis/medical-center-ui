import React from "react";
import "./Table.css";

export interface AppointmentRecord {
  appointmentID: number;
  patientID: number;
  examID: number;
  appointmentDate: string;
  fastResults: boolean;
  cost: number;
}

interface AppointmentsTableProps {
  appointments: AppointmentRecord[];
}

export default function AppointmentsTable({
  appointments,
}: AppointmentsTableProps) {
  return (
    <div className="table-wrapper">
      <table className="custom-dark-table">
        <thead>
          <tr>
            <th className="align-left">Appointment ID</th>
            <th className="align-left">Patient ID</th>
            <th className="align-left">Exam ID</th>
            <th className="align-left">Appointment Date</th>
            <th className="align-left">Fast Results</th>
            <th className="align-right">Cost</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-table-cell">
                No appointments found.
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.appointmentID}>
                <td className="appointment-id-cell align-left">
                  {appointment.appointmentID}
                </td>
                <td className="align-left">{appointment.patientID}</td>
                <td className="align-left">{appointment.examID}</td>
                <td className="align-left">{appointment.appointmentDate}</td>
                <td className="align-left">
                  {appointment.fastResults ? "Yes" : "No"}
                </td>
                <td className="align-right">{appointment.cost.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
