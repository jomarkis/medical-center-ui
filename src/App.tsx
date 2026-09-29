import { useState } from 'react';
import './App.css';
import Login from './Login';
import Login2 from './Login2';

function App() {
  const [selectedRole, setSelectedRole] = useState<'PATIENT' | 'DOCTOR' | 'ADMIN' | null>(null);

  if (selectedRole === null) {
    return <Login onSelectRole={(role) => setSelectedRole(role)} />;
  }

  return (
    <Login2 
      role={selectedRole} 
      onBack={() => setSelectedRole(null)} 
      onSumbitSuccess={() => console.log('Login successful')} 
    />
  );
}

export default App;