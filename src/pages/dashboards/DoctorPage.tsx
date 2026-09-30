import Header from '../../components/Header';

function DoctorPage({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      {/* Μπορείς να βάλεις και το μπλε χρώμα του γιατρού αν θες (#3182ce) */}
      <Header roleTitle="Doctor" onLogout={onLogout} themeColor="#3e89e5" />
      <main style={{ padding: '2rem' }}>
        <h1>Doctor Dashboard</h1>
      </main>
    </div>
  );
}

export default DoctorPage;