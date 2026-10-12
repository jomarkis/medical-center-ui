import React from "react";
import "./Table.css";

export interface ExamRecord {
  examID: number;
  examName: string;
  examCategory: string;
  maxSlotsPerDay: number;
  cost: number;
  doctorID: number;
  examType: string;
}

export interface ImagingExamRecord extends ExamRecord {
  machineType: string;
}

export interface MicrobiologicalExamRecord extends ExamRecord {
  sampleType: string;
}

export interface SpecializedExamRecord extends ExamRecord {
  examSpecialty: string;
}

const renderExamRow = (exam: ExamRecord) => {
  if (exam.examType === "IMAGING") {
    const imagingExam = exam as ImagingExamRecord;
    return (
      <tr key={imagingExam.examID}>
        <td className="doctor-id-cell align-left">{imagingExam.examID}</td>
        <td className="align-left">{imagingExam.examName}</td>
        <td className="align-left">{imagingExam.examCategory}</td>
        <td className="align-left">{imagingExam.maxSlotsPerDay}</td>
        <td className="align-left">{imagingExam.cost}</td>
        <td className="align-left">
          {"Machine Type: " + imagingExam.machineType}
        </td>
        <td className="align-right">{imagingExam.doctorID}</td>
      </tr>
    );
  }
  if (exam.examType === "MICROBIOLOGICAL") {
    const microbiologicalExam = exam as MicrobiologicalExamRecord;
    return (
      <tr key={microbiologicalExam.examID}>
        <td className="doctor-id-cell align-left">
          {microbiologicalExam.examID}
        </td>
        <td className="align-left">{microbiologicalExam.examName}</td>
        <td className="align-left">{microbiologicalExam.examCategory}</td>
        <td className="align-left">{microbiologicalExam.maxSlotsPerDay}</td>
        <td className="align-left">{microbiologicalExam.cost}</td>
        <td className="align-left">
          {"Sample Type: " + microbiologicalExam.sampleType}
        </td>
        <td className="align-right">{microbiologicalExam.doctorID}</td>
      </tr>
    );
  }
  if (exam.examType === "SPECIALIZED") {
    const specializedExam = exam as SpecializedExamRecord;
    return (
      <tr key={specializedExam.examID}>
        <td className="doctor-id-cell align-left">{specializedExam.examID}</td>
        <td className="align-left">{specializedExam.examName}</td>
        <td className="align-left">{specializedExam.examCategory}</td>
        <td className="align-left">{specializedExam.maxSlotsPerDay}</td>
        <td className="align-left">{specializedExam.cost}</td>
        <td className="align-left">
          {"Specialty: " + specializedExam.examSpecialty}
        </td>
        <td className="align-right">{specializedExam.doctorID}</td>
      </tr>
    );
  }
};

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
            <th className="align-left">Additional Info</th>
            <th className="align-right">Doctor ID</th>
          </tr>
        </thead>
        <tbody>
          {exams.length === 0 ? (
            <tr>
              <td colSpan={7} className="empty-table-cell">
                No exams found.
              </td>
            </tr>
          ) : (
            exams.map((exam) => renderExamRow(exam))
          )}
        </tbody>
      </table>
    </div>
  );
}
