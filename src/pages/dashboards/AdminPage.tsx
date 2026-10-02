import Header from "../../components/Header";
import ActionList from "../../components/ActionList";
import { useState } from "react";
import PatientsTable, {
  type PatientRecord,
} from "../../components/Tables/PatientsTable";

interface listAction {
  type: "Doctors" | "Patients" | "Appointments" | "Exams" | "Statistics";
  action: "view" | "create" | "delete";
}

const mockPatients: PatientRecord[] = [
  {
    patientID: "PAT001",
    patientPhone: "6981234567",
    email: "george@example.com",
  },
  {
    patientID: "PAT002",
    patientPhone: "6972345678",
    email: "maria@example.com",
  },
  {
    patientID: "PAT003",
    patientPhone: "6943456789",
    email: "nikos@example.com",
  },
  {
    patientID: "PAT004",
    patientPhone: "6934567890",
    email: "eleni@example.com",
  },
  {
    patientID: "PAT001",
    patientPhone: "6981234567",
    email: "george@example.com",
  },
  {
    patientID: "PAT002",
    patientPhone: "6972345678",
    email: "maria@example.com",
  },
  {
    patientID: "PAT003",
    patientPhone: "6943456789",
    email: "nikos@example.com",
  },
  {
    patientID: "PAT004",
    patientPhone: "6934567890",
    email: "eleni@example.com",
  },
  {
    patientID: "PAT001",
    patientPhone: "6981234567",
    email: "george@example.com",
  },
  {
    patientID: "PAT002",
    patientPhone: "6972345678",
    email: "maria@example.com",
  },
  {
    patientID: "PAT003",
    patientPhone: "6943456789",
    email: "nikos@example.com",
  },
  {
    patientID: "PAT004",
    patientPhone: "6934567890",
    email: "eleni@example.com",
  },
  {
    patientID: "PAT001",
    patientPhone: "6981234567",
    email: "george@example.com",
  },
  {
    patientID: "PAT002",
    patientPhone: "6972345678",
    email: "maria@example.com",
  },
  {
    patientID: "PAT003",
    patientPhone: "6943456789",
    email: "nikos@example.com",
  },
  {
    patientID: "PAT004",
    patientPhone: "6934567890",
    email: "eleni@example.com",
  },
];
//
function AdminPage({ onLogout }: { onLogout: () => void }) {
  const [activeAction, setActiveAction] = useState<listAction | null>(null);

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
              ← Πίσω στο Admin Dashboard
            </button>
            <h2>
              {activeAction.action.toUpperCase()} - {activeAction.type}
            </h2>
            {activeAction.type === "Patients" &&
            activeAction.action === "view" ? (
              <div>
                <h2 style={{ marginBottom: "1rem" }}>Λίστα Ασθενών</h2>
                <PatientsTable patients={mockPatients} />
              </div>
            ) : (
              <div>
                <h2>
                  {activeAction.action.toUpperCase()} - {activeAction.type}
                </h2>
                <p>Εδώ θα εμφανιστεί η αντίστοιχη οθόνη.</p>
              </div>
            )}
            <p>
              Εδώ εμφανίζεται το περιεχόμενο για {activeAction.type} (
              {activeAction.action}).
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
