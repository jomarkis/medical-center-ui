import Header from "../../components/Header";
import ActionList from "../../components/ActionList";
import { useEffect, useState } from "react";

import PatientsTable, {
  type PatientRecord,
} from "../../components/Tables/PatientsTable";

import Doctors, {
  type DoctorRecord,
} from "../../components/Tables/DoctorsTable";

import ExamTable, { type ExamRecord } from "../../components/Tables/ExamsTable";

import ExamsTable from "../../components/Tables/ExamsTable";

import CreatePatientMenuProps, {
  type CreatePatientData,
} from "../../components/CreateMenus/CreatePatientMenu";
import CreatePatientMenu from "../../components/CreateMenus/CreatePatientMenu";

import axios from "axios";
import DoctorsTable from "../../components/Tables/DoctorsTable";
import CreateDoctorMenu, {
  type CreateDoctorData,
} from "../../components/CreateMenus/CreateDoctorMenu";
import ExamsFilter, {
  type ExamFilters,
} from "../../components/Filters/ExamFilter";
import type {
  CreateIMAGINGExamData,
  CreateMICROBIOLOGICALExamData,
  CreateSPECIALIZEDExamData,
} from "../../components/CreateMenus/CreateExamMenu";
import CreateExamMenu from "../../components/CreateMenus/CreateExamMenu";
import AppointmentFilter, {
  type AppointmentFilters,
} from "../../components/Filters/AppointmentFilter";

interface listAction {
  type: "Doctors" | "Patients" | "Appointments" | "Exams" | "Statistics";
  action: "view" | "create" | "delete";
}
//
function AdminPage({ onLogout }: { onLogout: () => void }) {
  const [activeAction, setActiveAction] = useState<listAction | null>(null);

  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [filterError, setFilterError] = useState<string | null>(null);

  const [exams, setExams] = useState<ExamRecord[]>([]);

  useEffect(() => {
    if (activeAction?.type === "Patients" && activeAction?.action === "view") {
      const fetchPatients = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get<PatientRecord[]>(
            "http://localhost:8081/api/patients",
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
          );
          setPatients(response.data);
        } catch (err) {
          if (!handleError(err, setError)()) {
            console.error("Error fetching patients:", err);
            setError("Failed to load patient data.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchPatients();
    }
    if (activeAction?.type === "Doctors" && activeAction?.action === "view") {
      const fetchDoctors = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get<DoctorRecord[]>(
            "http://localhost:8081/api/doctors",
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
          );
          setDoctors(response.data);
        } catch (err) {
          if (!handleError(err, setError)()) {
            console.error("Error fetching doctors:", err);
            setError("Failed to load doctor data.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors();
    }
    if (activeAction?.type === "Exams" && activeAction?.action === "view") {
      const loadAllExams = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get<ExamRecord[]>(
            "http://localhost:8081/api/exams",
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
          );
          setExams(response.data);
        } catch (err) {
          if (!handleError(err, setError)()) {
            console.error("Error loading exams:", err);
          }
        }
      };

      loadAllExams();
    }
  }, [activeAction]);

  const handleError =
    (err: any, setErrorFunc: (error: string | null) => void) => () => {
      if (axios.isAxiosError(err) && err.response) {
        if (typeof err.response.data === "string") {
          setErrorFunc(err.response.data);
          return true;
        } else if (err.response.data?.message) {
          setErrorFunc(err.response.data.message);
          return true;
        } else {
          return false;
        }
      } else {
        setErrorFunc("Could not connect to the server. Please try again.");
      }
    };

  const handleCreatePatient = async (data: CreatePatientData) => {
    setIsSubmitting(true);
    setCreateError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8081/api/patients",
        {
          patientName: data.patientName,
          patientPhone: data.patientPhone,
          email: data.patientEmail,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setActiveAction({ type: "Patients", action: "view" });
    } catch (err) {
      if (!handleError(err, setCreateError)()) {
        console.error("Error creating patient:", err);
        setCreateError("Failed to create patient. Please check the details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateDoctor = async (data: CreateDoctorData) => {
    setIsSubmitting(true);
    setCreateError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8081/api/doctors",
        {
          doctorName: data.doctorName,
          doctorPhone: data.doctorPhone,
          specialty: data.specialty,
          years: data.years,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setActiveAction({ type: "Doctors", action: "view" });
    } catch (err) {
      if (!handleError(err, setCreateError)()) {
        console.error("Error creating doctor:", err);
        setCreateError("Failed to create doctor. Please check the details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExamFilter = async (data: ExamFilters) => {
    setIsSubmitting(true);
    setFilterError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<ExamRecord[]>(
        "http://localhost:8081/api/exams",
        {
          params: { doctorID: data.doctorID || null },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      setExams(response.data);
    } catch (err) {
      if (!handleError(err, setFilterError)()) {
        console.error("Error filtering exams:", err);
        setFilterError("Failed to fetch exams.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppointmentFilter = async (data: AppointmentFilters) => {
    /*
    setIsSubmitting(true);
    setFilterError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<AppointmentRecord[]>(
        "http://localhost:8081/api/appointments",
        {
          params: { doctorID: data.doctorID || null },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      setExams(response.data);
    } catch (err) {
      if (!handleError(err, setFilterError)()) {
        console.error("Error filtering exams:", err);
        setFilterError("Failed to fetch exams.");
      }
    } finally {
      setIsSubmitting(false);
    }
      */
  };

  const handleExamCreate = async (data: any) => {
    setIsSubmitting(true);
    setCreateError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8081/api/exams",
        {
          examName: data.examName,
          examCategory: data.examCategory,
          maxSlotsPerDay: data.maxSlotsPerDay,
          cost: data.cost,
          doctorID: data.doctorID,
          examType: data.examType,
          sampleType: (data as CreateMICROBIOLOGICALExamData).sampleType,
          examSpecialty: (data as CreateSPECIALIZEDExamData).examSpecialty,
          machineType: (data as CreateIMAGINGExamData).machineType,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setActiveAction({ type: "Exams", action: "view" });
    } catch (err) {
      if (!handleError(err, setCreateError)()) {
        console.error("Error creating exam:", err);
        setCreateError("Failed to create exam.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActionContent = () => {
    if (!activeAction) {
      return null;
    }

    if (activeAction.type === "Patients" && activeAction.action === "view") {
      return (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>Patients Table</h2>
          {loading && <p>Loading patients...</p>}
          {error && <p style={{ color: "#e53e3e" }}>{error}</p>}
          {!loading && !error && <PatientsTable patients={patients} />}
        </div>
      );
    }
    if (activeAction.type === "Patients" && activeAction.action === "create") {
      return (
        <CreatePatientMenu
          onSubmit={handleCreatePatient}
          onCancel={() => setActiveAction(null)}
          isLoading={isSubmitting}
          errorMessage={createError}
        />
      );
    }

    if (activeAction.type === "Doctors" && activeAction.action === "view") {
      return (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>Doctors Table</h2>
          {loading && <p>Loading doctors...</p>}
          {error && <p style={{ color: "#e53e3e" }}>{error}</p>}
          {!loading && !error && <DoctorsTable doctors={doctors} />}
        </div>
      );
    }

    if (activeAction.type === "Doctors" && activeAction.action === "create") {
      return (
        <CreateDoctorMenu
          onSubmit={handleCreateDoctor}
          onCancel={() => setActiveAction(null)}
          isLoading={isSubmitting}
          errorMessage={createError}
        />
      );
    }

    if (activeAction.type === "Exams" && activeAction.action === "view") {
      return (
        <div>
          <ExamsFilter
            onSubmit={handleExamFilter}
            onCancel={() => setActiveAction(null)}
            isLoading={isSubmitting}
            errorMessage={filterError}
          />

          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Exams List</h2>
            {isSubmitting && <p>Searching exams...</p>}
            {filterError && (
              <p style={{ color: "#e53e3e" }}>
                Please check the filter criteria.
              </p>
            )}
            {!isSubmitting && !filterError && <ExamTable exams={exams} />}
          </div>
        </div>
      );
    }
    if (activeAction.type === "Exams" && activeAction.action === "create") {
      return (
        <CreateExamMenu
          onSubmit={handleExamCreate}
          onCancel={() => setActiveAction(null)}
          isLoading={isSubmitting}
          errorMessage={createError}
        />
      );
    }
    if (
      activeAction.type === "Appointments" &&
      activeAction.action === "view"
    ) {
      return (
        <div>
          <AppointmentFilter
            onSubmit={handleAppointmentFilter}
            onCancel={() => setActiveAction(null)}
            isLoading={isSubmitting}
            errorMessage={filterError}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <Header roleTitle="Admin" onLogout={onLogout} themeColor="#b80000" />
      <main style={{ padding: "2rem" }}>
        {activeAction === null ? (
          <div>
            <h1>Admin Dashboard</h1>
            <ActionList
              items={[
                { type: "Patients" },
                { type: "Doctors" },
                { type: "Exams" },
                { type: "Appointments" },
                { type: "Statistics" },
              ]}
              onView={(type) => setActiveAction({ type: type, action: "view" })}
              onCreate={(type) =>
                setActiveAction({ type: type, action: "create" })
              }
              onDelete={(type) =>
                setActiveAction({ type: type, action: "delete" })
              }
            />
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveAction(null)}
              style={{
                marginBottom: "1rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              ← Back to AdminDashboard
            </button>
            {renderActionContent()}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
//

//
