import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { ThemeProvider } from './Context/ThemeContext';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './components/Admin/ProtectedRoute';

const AdminLogin = lazy(() => import('./Pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));

function AdminLayout() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-page-bg" />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
