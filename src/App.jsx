import { useState } from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import DocenteForm from './components/DocenteForm';
import ListDocentes from './components/ListDocentes';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('welcome');
  const [docentes, setDocentes] = useState([]);
  const [docenteToEdit, setDocenteToEdit] = useState(null);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div>
      <Menu activeScreen={activeScreen} onNavigate={(s) => { setActiveScreen(s); setDocenteToEdit(null); }} onLogout={() => { setIsLoggedIn(false); setActiveScreen('welcome'); setDocenteToEdit(null); }} />

      {activeScreen === 'welcome' && <Welcome totalDocentes={docentes.length} onNavigate={setActiveScreen} />}

      {activeScreen === 'form' && (
        <DocenteForm
          docenteToEdit={docenteToEdit}
          onSave={(d) => {
            if (docenteToEdit) {
              setDocentes(docentes.map((doc) => (doc.id === d.id ? d : doc)));
            } else {
              setDocentes([...docentes, d]);
            }
            setDocenteToEdit(null);
            setActiveScreen('list');
          }}
          onCancel={() => { setDocenteToEdit(null); setActiveScreen('list'); }}
        />
      )}

      {activeScreen === 'list' && (
        <ListDocentes
          docentes={docentes}
          onEdit={(d) => { setDocenteToEdit(d); setActiveScreen('form'); }}
          onDelete={(id) => setDocentes(docentes.filter((d) => d.id !== id))}
        />
      )}
    </div>
  );
}
