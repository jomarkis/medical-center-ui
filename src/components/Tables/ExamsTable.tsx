import React from "react";
import "./Table.css";

export interface ExamRecord {
  examID: number;
  examName: string;
  examCategory: string;
  maxSlotsPerDay: number;
  cost: number;
  doctorID: number;
}

interface ExamTableProps {
  exams: ExamRecord[];
}

export default function ExamsTable({ exams }: ExamTableProps) {
  return (
    <div className="table-wrapper">
      <table className="custom-dark-table">
        <thead>
          <tr>
            <th className="align-left">Exam ID</th>
            <th className="align-left">Exam Name</th>
            <th className="align-left">Exam Category</th>
            <th className="align-left">Max Slots Per Day</th>
            <th className="align-left">Cost</th>
            <th className="align-right">Doctor ID</th>
          </tr>
        </thead>
        <tbody>
          {exams.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-table-cell">
                No exams found.
              </td>
            </tr>
          ) : (
            exams.map((exam) => (
              <tr key={exam.examID}>
                <td className="doctor-id-cell align-left">{exam.examID}</td>
                <td className="align-left">{exam.examName}</td>
                <td className="align-left">{exam.examCategory}</td>
                <td className="align-left">{exam.maxSlotsPerDay}</td>
                <td className="align-left">{exam.cost}</td>
                <td className="align-right">{exam.doctorID}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
