import Header from '../../components/Header';

function AdminPage({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      <Header roleTitle="Admin" onLogout={onLogout} themeColor="#b80000" />
      <main style={{ padding: '2rem' }}>
        <h1>Admin Dashboard</h1>
      </main>
    </div>
  );
}

export default AdminPage;