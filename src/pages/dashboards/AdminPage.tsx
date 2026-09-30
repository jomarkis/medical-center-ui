import Header from "../../components/Header";
import ActionList from "../../components/ActionList";
import { useState } from "react";

interface listAction {
  type: "Doctors" | "Patients" | "Appointments" | "Exams" | "Statistics";
  action: "view" | "create" | "delete";
}

function AdminPage({ onLogout }: { onLogout: () => void }) {
  const [activeAction, setActiveAction] = useState<listAction | null>(null);

  return (
    <div>
      <Header roleTitle="Admin" onLogout={onLogout} themeColor="#b80000" />
      <main style={{ padding: "2rem" }}>
        <h1>Admin Dashboard</h1>
        {activeAction === null && (
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
        )}
      </main>
    </div>
  );
}

export default AdminPage;
