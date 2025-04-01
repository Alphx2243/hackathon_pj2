import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import Appointments from './pages/Appointments.tsx';
import Patients from './pages/Patients.tsx';
import Records from './pages/Records.tsx';
import Settings from './pages/Settings.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Dashboard /> */}
    {/* < Appointments /> */}
    {/* < Patients /> */}
    {/* < Records /> */}
    <Settings />
  </StrictMode>
);
