import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ActionList from "../../components/ActionList";
import Header from "../../components/Header";
import type { AppointmentRecord } from "../../components/Tables/AppointmentsTable";
import AppointmentsTable from "../../components/Tables/AppointmentsTable";
import axios from "axios";

interface listAction {
  type: "Appointments"
  action: "view";
}

function PatientPage({ onLogout }: { onLogout: () => void }) {
  const [activeAction, setActiveAction] = useState<listAction | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);

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

  useEffect(() => {
    if (
      activeAction?.type === "Appointments" &&
      activeAction?.action === "view"
    ) {
      const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get<AppointmentRecord[]>(
            "http://localhost:8081/api/appointments",
            {
              params: {
                patientID: localStorage.getItem("userId"),
              },
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
          );
          setAppointments(response.data);
        } catch (err) {
          if (!handleError(err, setError)()) {
            console.error("Error fetching appointments:", err);
            setError("Failed to load appointment data.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [activeAction]);

  const renderActionContent = () => {
    if (
      activeAction?.type === "Appointments" &&
      activeAction?.action === "view"
    ) {
      return (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>Appointments Table</h2>
          {loading && <p>Loading appointments...</p>}
          {error && <p style={{ color: "#e53e3e" }}>{error}</p>}
          {!loading && !error && (
            <AppointmentsTable appointments={appointments} />
          )}
        </div>
      );
    }
  };
  return (
    <div>
      <Header roleTitle="Patient" onLogout={onLogout} themeColor="#e53e3e" />
      <main style={{ padding: "2rem" }}>
        {activeAction === null ? (
          <div>
            <h1>Patient Dashboard</h1>
            <ActionList
              items={[{ type: "Appointments", hasView: true }]}
              onView={(item) => {
                setActiveAction({ type: "Appointments", action: "view" });
              }}
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

export default PatientPage;
