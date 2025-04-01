import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import { useAuth } from './hooks/useAuth';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Patients = React.lazy(() => import('./pages/Patients'));
const Appointments = React.lazy(() => import('./pages/Appointments'));
const Records = React.lazy(() => import('./pages/Records'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Login = React.lazy(() => import('./pages/Login'));

const queryClient = new QueryClient();

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                  </React.Suspense>
                }
              />
              <Route
                path="patients"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Patients />
                  </React.Suspense>
                }
              />
              <Route
                path="appointments"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Appointments />
                  </React.Suspense>
                }
              />
              <Route
                path="records"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Records />
                  </React.Suspense>
                }
              />
              <Route
                path="settings"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Settings />
                  </React.Suspense>
                }
              />
            </Route>
          ) : (
            <>
              <Route
                path="/login"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Login />
                  </React.Suspense>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;