import Header from "../../components/Header";
import ActionList from "../../components/ActionList";
import { useEffect, useState } from "react";

import PatientsTable, {
  type PatientRecord,
} from "../../components/Tables/PatientsTable";

import CreatePatientMenuProps, {
  type CreatePatientData,
} from "../../components/CreateMenus/CreatePatientMenu";
import CreatePatientMenu from "../../components/CreateMenus/CreatePatientMenu";

import axios from "axios";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

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
          console.error("Error fetching patients:", err);
          setError("Failed to load patient data.");
        } finally {
          setLoading(false);
        }
      };

      fetchPatients();
    }
  }, [activeAction]);

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

      // Μετά την επιτυχή δημιουργία, τον στέλνουμε αυτόματα στον πίνακα να δει τη λίστα
      setActiveAction({ type: "Patients", action: "view" });
    } catch (err) {
      console.error("Error creating patient:", err);
      setCreateError("Failed to create patient. Please check the details.");
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

    return (
      <div>
        <h2>
          {activeAction.action.toUpperCase()} - {activeAction.type}
        </h2>
      </div>
    );
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
