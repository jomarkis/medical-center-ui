import { useEffect, useState } from "react";
import Header from "../../components/Header";
import type { AppointmentRecord } from "../../components/Tables/AppointmentsTable";
import axios from "axios";
import ActionList from "../../components/ActionList";
import AppointmentsTable from "../../components/Tables/AppointmentsTable";
import type { ExamRecord } from "../../components/Tables/ExamsTable";
import ExamsTable from "../../components/Tables/ExamsTable";

interface listAction {
  type: "Appointments" | "Exams";
  action: "view";
}

function DoctorPage({ onLogout }: { onLogout: () => void }) {
  const [activeAction, setActiveAction] = useState<listAction | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);

  const [exams, setExams] = useState<ExamRecord[]>([]);

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
                doctorID: localStorage.getItem("userId"),
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
    if (activeAction?.type === "Exams" && activeAction?.action === "view") {
      const fetchExams = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get<ExamRecord[]>(
            "http://localhost:8081/api/exams",
            {
              params: {
                doctorID: localStorage.getItem("userId"),
              },
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
          );
          setExams(response.data);
        } catch (err) {
          if (!handleError(err, setError)()) {
            console.error("Error fetching exams:", err);
            setError("Failed to load exam data.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchExams();
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
    if (activeAction?.type === "Exams" && activeAction?.action === "view") {
      return (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>Exams Table</h2>
          {loading && <p>Loading exams...</p>}
          {error && <p style={{ color: "#e53e3e" }}>{error}</p>}
          {!loading && !error && <ExamsTable exams={exams} />}
        </div>
      );
    }
  };

  return (
    <div>
      <Header roleTitle="Doctor" onLogout={onLogout} themeColor="#3e89e5" />
      <main style={{ padding: "2rem" }}>
        {activeAction === null ? (
          <div>
            <h1>Doctor Dashboard</h1>
            <ActionList
              items={[
                { type: "Exams", hasView: true },
                { type: "Appointments", hasView: true },
              ]}
              onView={(type) => {
                if (type === "Appointments" || type === "Exams") {
                  setActiveAction({ type: type, action: "view" });
                }
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

export default DoctorPage;

//
