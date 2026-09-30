import Header from '../../components/Header';

function PatientPage({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      <Header roleTitle="Patient" onLogout={onLogout} themeColor="#e53e3e" />
      <main style={{ padding: '2rem' }}>
        <h1>Patient Dashboard</h1>
      </main>
    </div>
  );
}

export default PatientPage;